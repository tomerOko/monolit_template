import { AbstractError } from "./structured_error";

class EmailAlreadyExists extends AbstractError {

    static error_code = 409

    constructor( description: string, base_error?: Error){
        super(description, EmailAlreadyExists.error_code, base_error)
    }
    
}