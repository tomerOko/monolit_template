import { create_error } from "../../../../errors/error_factory"
import { wrap } from "../../../../utilities/function_wrapping"
import { AuthLogic } from "../base_auth_logic_class"


export class AuthHelperFuncionalityExample extends AuthLogic {
    
    constructor(){super()}

    // function that return true
    public someHelperFunction = async (role: string):Promise<boolean> => {
    return await wrap({name:"AuthRoleValidator/validateRole"}, async()=>{
            return true
    })}

  

}



