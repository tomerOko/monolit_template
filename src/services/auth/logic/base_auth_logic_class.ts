import { AuthDAL } from "../dal/auth_dal";

export class AuthLogic{
    constructor(){}
    static user_dal = new AuthDAL();
}