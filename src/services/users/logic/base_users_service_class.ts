import { UserDAL } from "../dal/users_dal";
import { UserLogic } from "./base_users_logic_class";
import {user_helpers} from './helpers/user_helpers_index'

export class UserService extends UserLogic{
    constructor(){super()}
    static user_helper = user_helpers
}