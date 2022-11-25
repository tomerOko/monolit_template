import { config } from "../../../config/confing_mock";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CreateManyResult, MongoGenericQueris, ReadManyResult } from "../../../utilities/mongo_generic_queris";
import { User } from "../types/users_types";

type This = InstanceType<typeof UserDAL>
export class UserDAL {

    private collection_name = config.system.mongo.collections.users

    public createUser = async (user: User):Promise<CreateManyResult> => {
    return await wrap<This["createUser"]>({name: "UserDAL/createUser"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<User>({collection_name:this.collection_name, values:[user]})
        return reslut
    })}

    public getUsersBy = async (user_props: Partial<User>):Promise<ReadManyResult<User>> => {
    return await wrap<This["getUsersBy"]>({name: "UserDAL/getUsersBy"}, async()=>{
        const reslut = await MongoGenericQueris.readManyBy<User>({collection_name:this.collection_name, filter:user_props})
        return reslut as ReadManyResult<User>
    })}

    public getSinlgeUserBy = async (user_props: Partial<User>):Promise<User | null> => {
    return await wrap<This["getSinlgeUserBy"]>({name: "UserDAL/getSinlgeUserBy"}, async()=>{
        const reslut = await MongoGenericQueris.readSingleBy<User>({collection_name:this.collection_name, filter:user_props})
        return reslut as User | null
    })}
}