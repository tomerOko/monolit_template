import { UserDAL } from "../dal/users_dal";
import {user_helpers} from './helpers/index'

export class UserLogic{
    constructor(){}
    static user_dal = new UserDAL();
}