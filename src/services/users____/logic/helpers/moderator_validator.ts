import { UserLogic } from "../base_users_logic_class"


export class ModeratorValidator extends UserLogic {
    
    constructor(){super()}

    public validate_moderator = async (user_toke: string): Promise<Role>=> {
        const user_filter:{token: user_toke}
        const user = await ModeratorValidator.user_dal.getSinlgeUserBy(user_filter)
        if (!(user?[0]?.rol)) {
            
        }

    }
}