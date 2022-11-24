import { config } from "../../../config/confing_mock";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CreateManyResult, MongoGenericQueris, ReadResult } from "../../../utilities/mongo_generic_queris";
import { User } from "../types/users_types";

type This = InstanceType<typeof UserDAL>
export class UserDAL {

    private collection_name = config.system.mongo.collections.users

    public createUser = async (user: User):Promise<CreateManyResult> => {
    return await wrap<This["createUser"]>({name: "UserService/createUser"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<User>({collection_name:this.collection_name, values:[user]})
        return reslut
    })}

    public getUserBy = async (user_props: Partial<User>):Promise<ReadResult<User>> => {
    return await wrap<This["getUserBy"]>({name: "UserService/createUser"}, async()=>{
        const reslut = await MongoGenericQueris.readBy<User>({collection_name:this.collection_name, filter:user_props})
        return reslut
    })}
}