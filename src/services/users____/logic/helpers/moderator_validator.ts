import { UserDAL } from "../dal/users_dal";
import { Role, User, UserIdFilter } from "../types/users_types";

export class ModeratorValidator {
    
    constructor(
        private user_dal = new UserDAL()
    ){}

    public validate_moderator = async (user_toke: string): Promise<Role>=> {
        const user_filter: UserIdFilter = {token: user_toke}
        const user = await this.user_dal.getUserBy(user_filter)
        if (!(user?[0]?.rol)) {
            
        }

    }
}