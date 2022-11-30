import { create_error } from "../../../../errors/error_factory"
import { wrap } from "../../../../utilities/function_wrapping"
import { Role, roles, UserFilterByID } from "../../types/users_types"
import { UserLogic } from "../base_users_logic_class"


export class UserRoleValidator extends UserLogic {
    
    constructor(){super()}

    public validate_moderator = async (user_toke: string): Promise<void>=> {
    return await wrap({name:'UserRoleValidator/validate_moderator'}, async () => {

        const user_filter: UserFilterByID = {token: user_toke}
        const user = await UserRoleValidator.user_dal.getSinlgeUserByID(user_filter)
        const user_role = user.role
        const moderator_roles = [roles.moderator, roles.basic] as Role[]
        if (!moderator_roles.includes(user_role)) throw create_error("not moderator error")
        
    })}
  
    
    public validate_user_role = async (user_toke: string, specific_moderator_type:Role): Promise<void>=> {
    return await wrap({name:'UserRoleValidator/validate_user_role'}, async () => {

        const user_filter: UserFilterByID = {token: user_toke}
        const user = await UserRoleValidator.user_dal.getSinlgeUserByID(user_filter)
        const user_role = user.role
        if(user_role!==specific_moderator_type) throw create_error("user role not allowed error")

    })}

}


