import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CreateManyResult, MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { User } from "../types/users_types";

type This = InstanceType<typeof UserDAL>
export class UserDAL {

    public async createUser(user: User):Promise<CreateManyResult>{
    return await wrap<This["createUser"]>({name: "UserService/createUser"}, async()=>{

        const reslut = await MongoGenericQueris.createMany<User>({collection_name: 'users', values:[user]})
        return reslut
        
    })}
}