import { prisma } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import type { Application, User } from "../generated/prisma/client";
import {
  toApplicationResponse,
  type ApplicationResponse,
  type CreateApplicationRequest,
  type UpdateApplicationRequest,
} from "../model/application-model";
import { ApplicationValidation } from "../validation/application-validation";
import { Validation } from "../validation/validation";

export class ApplicationService {
  static async create(
    user: User,
    request: CreateApplicationRequest,
  ): Promise<ApplicationResponse> {
    const createRequest = Validation.validate(
      ApplicationValidation.CREATE,
      request,
    );

    // const record = {
    //   ...createRequest,
    //   ...{ username: user.username },
    // };

    const application = await prisma.application.create({
      data: {
        ...createRequest,
        application_date: new Date(createRequest.application_date),
        username: user.username,
      },
    });

    logger.debug("record : " + JSON.stringify(application));
    return toApplicationResponse(application);
  }

  static async checkApplicationMustExists(
    username: string,
    applicationId: number,
  ): Promise<Application> {
    if (!Number.isInteger(applicationId)) {
      throw new ResponseError(404, "Application is not found");
    }
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        username: username,
      },
    });

    if (!application) {
      throw new ResponseError(404, "Application not found");
    }

    return application;
  }

  static async get(user: User, id: number): Promise<ApplicationResponse> {
    const application = await this.checkApplicationMustExists(
      user.username,
      id,
    );
    return toApplicationResponse(application);
  }

  static async update(
    user: User,
    request: UpdateApplicationRequest,
  ): Promise<ApplicationResponse> {
    const updateRequest = Validation.validate(
      ApplicationValidation.UPDATE,
      request,
    );
    await this.checkApplicationMustExists(user.username, updateRequest.id);

    const { id, application_date, ...data } = updateRequest;

    const application = await prisma.application.update({
      where: {
        id: id,
        username: user.username,
      },
      data: {
        ...data,
        application_date: application_date
          ? new Date(application_date)
          : undefined,
      },
    });

    return toApplicationResponse(application);
  }
}
