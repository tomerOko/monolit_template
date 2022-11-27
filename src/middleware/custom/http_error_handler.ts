import { NextFunction, Request, Response } from "express";
import { config } from "../../config/confing_mock";
import { create_error, default_error_structure_type, StructuedErrorTypes, stuctureErrorIfNotStructuredYet } from "../../errors/error_factory";
import { StructuedError } from "../../errors/structured_error";

export const http_error_handler = (error: StructuedError | unknown, req: Request, res: Response, next: NextFunction) => {
    const report_unhandled_errors_to_client = config.system.error_handling.report_unhandled_errors_to_client;
    const error_type: StructuedErrorTypes = report_unhandled_errors_to_client ? "un handled error" : default_error_structure_type;
    const structued_error = stuctureErrorIfNotStructuredYet(error, error_type);
    res.status(structued_error.status_code).send(structued_error.toString())
}

