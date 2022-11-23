import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CreateManyResult } from "../../../utilities/mongo_generic_queris";
import { UserDAL } from "../dal/users_dal";
import { User } from "../types/users_types";

type This = InstanceType<typeof UserService>
export class UserService {

    constructor(private user_dal = new UserDAL()) {}


    public async createUser(user: User):Promise<CreateManyResult>{
    return await wrap<This["createUser"]>({name:"UserService/createUser"}, async()=>{
        const query_result = await this.user_dal.createUser(user)
        return query_result
    })}
}