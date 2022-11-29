import { config } from "../config/confing_mock";
import { StructuedErrorTypes } from "./error_factory";

export type StructuedErrorParams = {
    type:StructuedErrorTypes,
    status_code: number,
    description: string, 
    base_error?: unknown,
    print_base_error_anyway?: boolean
}

export class StructuedError extends Error {

    public readonly is_structured_error = true
    public readonly type:StructuedErrorTypes
    public readonly status_code: number
    public readonly description: string
    public readonly base_error?: unknown
    private print_base_error_anyway?: boolean

    constructor(params: StructuedErrorParams) {
        super(params.description);
        this.type = params.type
        this.status_code = params.status_code,
        this.description = params.description,
        this.base_error = params.base_error,
        this.print_base_error_anyway = params.print_base_error_anyway
    }

    public toString(): string {
        const data_relevant_to_user = {
            error_type: this.type,
            status_code: this.status_code,
            error_description : this.description
        }
        if (config.system.error_handling.return_error_stack_to_client){
            data_relevant_to_user["stack"] = this.stack
        }
        if (config.system.error_handling.return_native_error_to_client ||  this.print_base_error_anyway){
            data_relevant_to_user["base_error"] = this.base_error
        }
        
        return JSON.stringify(data_relevant_to_user)
    }

}
