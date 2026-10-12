import { prisma } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import type { Application, Prisma, User } from "../generated/prisma/client";
import {
  toApplicationResponse,
  type ApplicationResponse,
  type CreateApplicationRequest,
  type SearchApplicationRequest,
  type UpdateApplicationRequest,
} from "../model/application-model";
import type { Pageable } from "../model/page";
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

  static async remove(user: User, id: number): Promise<ApplicationResponse> {
    await this.checkApplicationMustExists(user.username, id);

    const application = await prisma.application.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    return toApplicationResponse(application);
  }

  static async search(
    user: User,
    request: SearchApplicationRequest,
  ): Promise<Pageable<ApplicationResponse>> {
    const searchRequest = Validation.validate(
      ApplicationValidation.SEARCH,
      request,
    );
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters: Prisma.ApplicationWhereInput[] = [];
    // check if q exist
    if (searchRequest.q) {
      filters.push({
        OR: [
          {
            company: {
              contains: searchRequest.q,
            },
          },
          {
            job_title: {
              contains: searchRequest.q,
            },
          },
        ],
      });
    }
    // check if location exist
    if (searchRequest.location) {
      filters.push({
        location: {
          contains: searchRequest.location,
        },
      });
    }
    // check if status exist
    if (searchRequest.status) {
      filters.push({
        status: searchRequest.status,
      });
    }

    const application = await prisma.application.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      orderBy: [{ application_date: "desc" }, { id: "desc" }],
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prisma.application.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: application.map((application) =>
        toApplicationResponse(application),
      ),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
