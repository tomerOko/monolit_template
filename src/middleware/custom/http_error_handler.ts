import { NextFunction, Request, Response } from "express";
import { config } from "../../config/confing_mock";
import { create_error, default_error_structure_type, StructuedErrorTypes, stucture_an_existing_error } from "../../errors/error_factory";
import { StructuedError } from "../../errors/structured_error";
import { wrap, wrapSync } from "../../utilities/function_wrapping";

export class HttpErrorHandler{

    public static handle_app_level_error(error: StructuedError | unknown, req: Request, res: Response, next: NextFunction):void {
    wrapSync({name:"HttpErrorHandler/handle_error"},()=>{
        const structued_error = HttpErrorHandler.parse_errror_to_response(error);
        res.status(structued_error.status_code).send(structued_error.toString())
    })}


    public static send_error_respose = (error: StructuedError | unknown, res: Response) => {
    wrapSync({name:"HttpErrorHandler/send_error_respose"},()=>{
        const structued_error = HttpErrorHandler.parse_errror_to_response(error);
        res.status(structued_error.status_code).send(structued_error.toString())
    })}

    private static parse_errror_to_response(error: StructuedError | unknown):StructuedError{
    return wrapSync({name:"HttpErrorHandler/parse_errror_to_response"},()=>{
        if((error as StructuedError).is_structured_error){
            return error as StructuedError;
        }
        const report_unhandled_raw_errors_to_client = config.system.error_handling.report_unhandled_errors_to_client;
        const structued_error = create_error(default_error_structure_type, error, report_unhandled_raw_errors_to_client );
        return structued_error;
    })}

}

