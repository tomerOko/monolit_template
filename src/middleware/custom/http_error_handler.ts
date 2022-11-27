import { NextFunction, Request, Response } from "express";
import { config } from "../../config/confing_mock";
import { create_error, StructuedErrorTypes } from "../../errors/error_factory";
import { StructuedError } from "../../errors/structured_error";

export const http_error_handler = (error: StructuedError | unknown, req: Request, res: Response, next: NextFunction) => {
    let structued_error:StructuedError
    if ((error as StructuedError).is_structured_error) {
        structued_error = error as StructuedError
    }else{
        const report_unhanled_errors = config.system.error_handling.report_unhandled_errors_to_client
        const default_error_type: StructuedErrorTypes = report_unhanled_errors ? "un handled error" : "internal error"
        structued_error = create_error(default_error_type)
    }
    res.status(structued_error.status_code).send(structued_error.toString())
}