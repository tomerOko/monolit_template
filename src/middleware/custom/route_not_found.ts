import { create_error } from "../../errors/error_factory";
import { logger } from "../../utilities/logger";

export const route_not_found = (req, res, next) => {
    const error = create_error("not found error")
    logger.error(req.url + '  Not found')
    return next(error)
}