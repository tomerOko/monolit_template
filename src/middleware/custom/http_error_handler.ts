import { logger } from "../../utilities/logger";

export const http_error_handler = (req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    });
    logger.error(req.url + '  Not found')
}