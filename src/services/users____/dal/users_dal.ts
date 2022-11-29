import { config } from "../../../config/confing_mock";
import { create_error } from "../../../errors/error_factory";
import { StructuedError } from "../../../errors/structured_error";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { CreateManyUsersResult, CreateSingleUserQuery, DeleteUsersResult, ReadManyUserQuery, ReadSingleUserQuery, UpdateSingleUserQuery, UpdateSingleUserResult, User, UserFilter } from "../types/users_types";

type This = InstanceType<typeof UserDAL>
export class UserDAL {

    private collection_name = config.system.mongo.collections.users

    public createUser = async (user: User):Promise<void> => { 
    return await wrap<This["createUser"]>({name: "UserDAL/createUser"}, async()=>{
        try {
            const query: CreateSingleUserQuery = {collection_name:this.collection_name, value:user}
            const reslut = await MongoGenericQueris.createSinlge<User>(query)
        } catch (error) {
            if((error as StructuedError).type == "document was not created")
                throw create_error("user allready exist") //TODO: this in not totaly wright, if no document created it might be for diffrent reason?
            throw error
        }
    })}

    public getSinlgeUserByID = async (user_props: UserFilter):Promise<User> => {
    return await wrap<This["getSinlgeUserByID"]>({name: "UserDAL/getSinlgeUserBy"}, async()=>{
        try {
            const query: ReadSingleUserQuery = {collection_name:this.collection_name, filter:user_props}
            const reslut = await MongoGenericQueris.readSingleBy<User>(query)
            return reslut
        } catch (error) {
            if((error as StructuedError).type == "document was not found")
                throw create_error("no user found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
            throw error
        }
    })}

    public getUsersBy = async (user_props: UserFilter):Promise<User []> => {
    return await wrap<This["getUsersBy"]>({name: "UserDAL/getUsersBy"}, async()=>{
        const query: ReadManyUserQuery = {collection_name:this.collection_name, filter:user_props}
        const reslut = await MongoGenericQueris.readManyBy<User>(query)
        return reslut as User[]
    })}

    public UpdateSingleUserbByID = async (user_id: string, values_to_update: Partial<User>):Promise<UpdateSingleUserResult> => {
        return await wrap<This["UpdateSingleUserbByID"]>({name: "UserDAL/UpdateSingleUserbByID"}, async()=>{
            const query: UpdateSingleUserQuery = {collection_name: this.collection_name, filter: {token: user_id}, update_values:values_to_update, upsert: false}
            const reslut = await MongoGenericQueris.updateSingle<User>(query)
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