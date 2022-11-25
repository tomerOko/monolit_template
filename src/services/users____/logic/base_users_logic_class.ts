import { UserDAL } from "../dal/users_dal";

export class UserLogic{
    constructor(){}
    static user_dal = new UserDAL();
}