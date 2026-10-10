import { prisma } from "../application/database";
import { logger } from "../application/logging";
import type { User } from "../generated/prisma/client";
import {
  toApplicationResponse,
  type ApplicationResponse,
  type CreateApplicationRequest,
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
}
