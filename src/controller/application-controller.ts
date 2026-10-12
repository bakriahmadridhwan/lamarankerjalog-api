import type { Response, NextFunction } from "express";
import type {
  CreateApplicationRequest,
  SearchApplicationRequest,
  UpdateApplicationRequest,
} from "../model/application-model";
import { ApplicationService } from "../service/application-service";
import type { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";
import type { ApplicationStatus } from "../generated/prisma/enums";

export class ApplicationController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateApplicationRequest =
        req.body as CreateApplicationRequest;
      const response = await ApplicationService.create(req.user!, request);
      logger.debug("response : " + JSON.stringify(response));
      res.status(201).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const applicationId = Number(req.params.applicationId);
      const response = await ApplicationService.get(req.user!, applicationId);
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateApplicationRequest =
        req.body as UpdateApplicationRequest;
      request.id = Number(req.params.applicationId);

      const response = await ApplicationService.update(req.user!, request);
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const applicationId = Number(req.params.applicationId);
      const response = await ApplicationService.remove(
        req.user!,
        applicationId,
      );
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchApplicationRequest = {
        q: req.query.q as string | undefined,
        location: req.query.location as string | undefined,
        status: req.query.status as ApplicationStatus | undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await ApplicationService.search(req.user!, request);
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
