import { NextFunction, Request, Response } from "express";
import { create_error } from "../../errors/error_factory";
import { logger } from "../../utilities/logger";

export const route_not_found = (req:Request, res: Response, next: NextFunction) => {
    const error = create_error("not found error")
    logger.error(req.url + '  Not found')
    return next(error)
}