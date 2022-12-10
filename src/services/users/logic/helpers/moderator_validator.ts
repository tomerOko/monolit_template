import { create_error } from "../../../../errors/error_factory"
import { wrap } from "../../../../utilities/function_wrapping"
import { Role, roles, UserIDFilter } from "../../types/users_types"
import { UserLogic } from "../base_users_logic_class"


export class UserRoleValidator extends UserLogic {
    
    constructor(){super()}

    public validate_moderator = async (user_id_filter: UserIDFilter): Promise<void>=> {
    return await wrap({name:'UserRoleValidator/validate_moderator'}, async () => {

        const user = await UserRoleValidator.user_dal.getSinlgeUserByID(user_id_filter)
        const user_role = user.role
        const moderator_roles = [roles.moderator, roles.basic] as Role[]
        if (!moderator_roles.includes(user_role)) throw create_error("not moderator error")
        
    })}
  
    
    public validate_super_moderator = async (user_id_filter: UserIDFilter): Promise<void>=> {
    return await wrap({name:'UserRoleValidator/validate_super_moderator'}, async () => {

        const user = await UserRoleValidator.user_dal.getSinlgeUserByID(user_id_filter)
        const user_role = user.role
        if(user_role!==roles.super_moderator) throw create_error("not super moderator error")

    })}

}



