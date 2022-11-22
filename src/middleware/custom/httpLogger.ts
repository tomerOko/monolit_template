import { logger } from "../../utilities/logger";

export const http_logger = (req, res, next) => {
    logger.info(`request url: '${req.url}' request type: '${req.method}'`);
    next()
  }