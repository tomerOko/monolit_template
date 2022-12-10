import { config } from "../../../config/confing_mock";
import { create_error } from "../../../errors/error_factory";
import { StructuedError } from "../../../errors/structured_error";
import { wrap } from "../../../utilities/function_wrapping";
import { MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { CreateSingleUserQuery, DeleteSingleUserQuery, DeleteUsersResult, ReadManyUserQuery, ReadManyUsersResult, ReadSingleUserQuery, ReadSingleUserResult, UpdatedManyUsersResult, UpdateManyUserQuery, UpdateSingleUserQuery, UpdateSingleUserResult, User, UserFilter, UserIDFilter, UserUpdateValues } from "../types/users_types";

export class UserDAL {

    private collection_name = config.system.mongo.collections.users

    public createUser = async (user: User):Promise<void> => { 
    return await wrap({name: "UserDAL/createUser"}, async()=>{
        try {
            const query: CreateSingleUserQuery = {collection_name:this.collection_name, value:user}
            await MongoGenericQueris.createSinlge<User>(query)
        } catch (error) {
            if((error as StructuedError).type == "document was not created")
                throw create_error("user allready exist") //TODO: this in not totaly wright, if no document created it might be for diffrent reason?
            throw error
        }
    })}

    public getSinlgeUserByID = async (user_id_filter: UserIDFilter):Promise<User> => {
    return await wrap({name: "UserDAL/getSinlgeUserBy"}, async()=>{
        try {
            const query: ReadSingleUserQuery = {collection_name:this.collection_name, filter:user_id_filter}
            const reslut: ReadSingleUserResult = await MongoGenericQueris.readSingleBy<User>(query)
            return reslut
        } catch (error) {
            if((error as StructuedError).type == "document was not found")
                throw create_error("no user found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
            throw error
        }
    })}

    public getUsersBy = async (users_filter: UserFilter):Promise<User []> => {
    return await wrap({name: "UserDAL/getUsersBy"}, async()=>{
        const query: ReadManyUserQuery = {collection_name:this.collection_name, filter:users_filter}
        const reslut:ReadManyUsersResult = await MongoGenericQueris.readManyBy<User>(query)
        return reslut as User[]
    })}


    public UpdateSingleUserbByID = async (user_id_filter: UserIDFilter, values_to_update: UserUpdateValues):Promise<UpdateSingleUserResult> => {
    return await wrap({name: "UserDAL/UpdateSingleUserbByID"}, async()=>{
        const query: UpdateSingleUserQuery = {collection_name: this.collection_name, filter: user_id_filter, update_values:values_to_update, upsert: false}
        const reslut = await MongoGenericQueris.updateSingle<User>(query)
        return reslut
    })}


    public UpdateManyUsers = async (users_filter: UserFilter, values_to_update: UserUpdateValues):Promise<UpdatedManyUsersResult> => {
    return await wrap({name: "UserDAL/UpdateManyUsers"}, async()=>{
        const query: UpdateManyUserQuery = {
            collection_name: this.collection_name,
            filter: users_filter,
            update_values: values_to_update,
            upsert: false 
        }
        const reslut = await MongoGenericQueris.updateMany<User>(query)
        return reslut
    })}

    public deleteSinlgeUserByID = async (user_id_filter: UserIDFilter):Promise<void> => {
        await wrap({name: "UserDAL/deleteSinlgeUserByID"}, async()=>{
            try {
                const query: DeleteSingleUserQuery = {collection_name:this.collection_name, filter:user_id_filter}
                const reslut = await MongoGenericQueris.deleteSingle<User>(query)
            } catch (error) {
                if((error as StructuedError).type == "document was not deleted")
                    throw create_error("no user found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
                throw error
            }
        })}

}