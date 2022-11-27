import { config } from "../config/confing_mock";
import { StructuedErrorTypes } from "./error_factory";

export class StructuedError extends Error {

    public readonly is_structured_error = true

    constructor(public readonly type:StructuedErrorTypes, public readonly status_code: number, public readonly description: string, public readonly base_error?: unknown) {
        super(description);
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
        if (config.system.error_handling.return_native_error_to_client){
            data_relevant_to_user["base_error"] = this.base_error
        }
        
        return JSON.stringify(data_relevant_to_user)
    }

}
