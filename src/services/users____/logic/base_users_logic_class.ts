import { UserDAL } from "../dal/users_dal";
import {user_helpers} from './helpers/user_helpers_index'

export class UserLogic{
    constructor(){}
    static user_dal = new UserDAL();
    static user_helper = user_helpers
}