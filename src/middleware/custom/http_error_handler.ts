import { NextFunction, Request, Response } from "express";
import { create_error } from "../../errors/error_factory";
import { StructuedError } from "../../errors/structured_error";

export const http_error_handler = (error: StructuedError | unknown, req: Request, res: Response, next: NextFunction) => {
    let structued_error:StructuedError
    if ((error as StructuedError).is_structured_error) {
        structued_error = error as StructuedError
    }else{
        structued_error = create_error("internal error")
    }
    res.status(structued_error.status_code).send(structued_error.toString())
}