import { config } from "../config/confing_mock";

export abstract class AbstractError extends Error {

    public readonly is_structured = true

    constructor(private description: string, private status_code: number, private base_error?: Error) {
        super(description);
    }

    public toString(): string {
        const data_relevant_to_user = {
            status_code: this.status_code,
            message : this.description
        }
        if (config.system.error_handling.return_error_stack_to_user){
            data_relevant_to_user["stack"] = this.stack
        }
        if (config.system.error_handling.return_native_error_to_user){
            data_relevant_to_user["base_error"] = this.base_error
        }
        
        return JSON.stringify(data_relevant_to_user)
    }

}
