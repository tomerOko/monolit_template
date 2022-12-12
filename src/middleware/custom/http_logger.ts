import { NextFunction, Request, Response } from "express";
import { logger } from "../../utilities/logger";

export const http_logger = (req:Request, res: Response, next: NextFunction) => {
  const { rawHeaders, httpVersion, method, socket, url } = req;
  const { remoteAddress, remoteFamily } = socket;
  const log = JSON.stringify({
    rawHeaders,
    httpVersion,
    method,
    remoteAddress,
    remoteFamily,
    url
  })
  logger.info(log);
  next()
}

  
