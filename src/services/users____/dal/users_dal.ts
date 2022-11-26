import { config } from "../../../config/confing_mock";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { CreateManyUsersResult, DeleteUsersResult, User, UserFilter } from "../types/users_types";

type This = InstanceType<typeof UserDAL>
export class UserDAL {

    private collection_name = config.system.mongo.collections.users

    public createUser = async (user: User):Promise<CreateManyUsersResult> => {
    return await wrap<This["createUser"]>({name: "UserDAL/createUser"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<User>({collection_name:this.collection_name, values:[user]})
        return reslut
    })}

    public getSinlgeUserBy = async (user_props: UserFilter):Promise<User | null> => {
    return await wrap<This["getSinlgeUserBy"]>({name: "UserDAL/getSinlgeUserBy"}, async()=>{
        const reslut = await MongoGenericQueris.readSingleBy<User>({collection_name:this.collection_name, filter:user_props})
        return reslut as User | null
    })}

    public getUsersBy = async (user_props: UserFilter):Promise<User []> => {
    return await wrap<This["getUsersBy"]>({name: "UserDAL/getUsersBy"}, async()=>{
        const reslut = await MongoGenericQueris.readManyBy<User>({collection_name:this.collection_name, filter:user_props})
        return reslut as User[]
    })}

    public UpdateSingleUserbBy = async (user: User):Promise<CreateManyUsersResult> => {
    return await wrap<This["UpdateSingleUserbBy"]>({name: "UserDAL/UpdateSingleUserbBy"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<User>({collection_name:this.collection_name, values:[user]})
        return reslut
    })}

    public UpdateManyUsers = async (user: User):Promise<CreateManyUsersResult> => {
    return await wrap<This["UpdateManyUsers"]>({name: "UserDAL/UpdateManyUsers"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<User>({collection_name:this.collection_name, values:[user]})
        return reslut
    })}

    public deleteUsers = async (user_props: UserFilter):Promise<DeleteUsersResult> => {
    return await wrap<This["deleteUsers"]>({name: "UserDAL/deleteUsers"}, async()=>{
        const reslut = await MongoGenericQueris.delete<User>({collection_name:this.collection_name, filter:user_props, delete_many: true})
        return reslut 
    })}

}