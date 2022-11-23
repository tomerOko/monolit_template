import { dir } from "console";
import { wrap, wrapSync } from "../../../utilities/functionWrapping";
import { logger } from "../../../utilities/logger";
import { UserDAL } from "../dal/users_dal";
import { User } from "../types/users_types";

type This = InstanceType<typeof UserService>
export class UserService {

    constructor(private user_dal = new UserDAL()) {}


    public async createUser(user: User):Promise<>{
    return await wrap<This["createUser"]>(async()=>{

        //todo: update any other services
        //bussines logic validations

        const result = await this.user_dal.createUser(user)
        if (result.inserted>0) {
            
        }

        //do logic
        //return reuslt

    },[user],"UserService/createUser")}
}