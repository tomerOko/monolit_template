import { config } from "../../../config/confing_mock";
import { create_error } from "../../../errors/error_factory";
import { StructuedError } from "../../../errors/structured_error";
import { wrap } from "../../../utilities/function_wrapping";
import { MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { CreateSingleAuthQuery, DeleteSingleAuthQuery, DeleteAuthsResult, ReadManyAuthQuery, ReadManyAuthsResult, ReadSingleAuthQuery, ReadSingleAuthResult, UpdatedManyAuthsResult, UpdateManyAuthQuery, UpdateSingleAuthQuery, UpdateSingleAuthResult, Auth, AuthFilter, AuthIDFilter, AuthUpdateValues } from "../types/auth_types";

export class AuthDAL {

    private collection_name = config.system.mongo.collections.auths

    // public createAuth = async (auth: Auth):Promise<void> => { 
    // return await wrap({name: "AuthDAL/createAuth"}, async()=>{
    //     try {
    //         const query: CreateSingleAuthQuery = {collection_name:this.collection_name, value:auth}
    //         await MongoGenericQueris.createSinlge<Auth>(query)
    //     } catch (error) {
    //         if((error as StructuedError).type == "document was not created")
    //             throw create_error("auth allready exist") //TODO: this in not totaly wright, if no document created it might be for diffrent reason?
    //         throw error
    //     }
    // })}

    // public getSinlgeAuthByID = async (auth_id_filter: AuthIDFilter):Promise<Auth> => {
    // return await wrap({name: "AuthDAL/getSinlgeAuthBy"}, async()=>{
    //     try {
    //         const query: ReadSingleAuthQuery = {collection_name:this.collection_name, filter:auth_id_filter}
    //         const reslut: ReadSingleAuthResult = await MongoGenericQueris.readSingleBy<Auth>(query)
    //         return reslut
    //     } catch (error) {
    //         if((error as StructuedError).type == "document was not found")
    //             throw create_error("no auth found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
    //         throw error
    //     }
    // })}

    // public getAuthsBy = async (auths_filter: AuthFilter):Promise<Auth []> => {
    // return await wrap({name: "AuthDAL/getAuthsBy"}, async()=>{
    //     const query: ReadManyAuthQuery = {collection_name:this.collection_name, filter:auths_filter}
    //     const reslut:ReadManyAuthsResult = await MongoGenericQueris.readManyBy<Auth>(query)
    //     return reslut as Auth[]
    // })}


    // public UpdateSingleAuthbByID = async (auth_id_filter: AuthIDFilter, values_to_update: AuthUpdateValues):Promise<UpdateSingleAuthResult> => {
    // return await wrap({name: "AuthDAL/UpdateSingleAuthbByID"}, async()=>{
    //     const query: UpdateSingleAuthQuery = {collection_name: this.collection_name, filter: auth_id_filter, update_values:values_to_update, upsert: false}
    //     const reslut = await MongoGenericQueris.updateSingle<Auth>(query)
    //     return reslut
    // })}


    // public UpdateManyAuths = async (auths_filter: AuthFilter, values_to_update: AuthUpdateValues):Promise<UpdatedManyAuthsResult> => {
    // return await wrap({name: "AuthDAL/UpdateManyAuths"}, async()=>{
    //     const query: UpdateManyAuthQuery = {
    //         collection_name: this.collection_name,
    //         filter: auths_filter,
    //         update_values: values_to_update,
    //         upsert: false 
    //     }
    //     const reslut = await MongoGenericQueris.updateMany<Auth>(query)
    //     return reslut
    // })}

    // public deleteSinlgeAuthByID = async (auth_id_filter: AuthIDFilter):Promise<void> => {
    //     await wrap({name: "AuthDAL/deleteSinlgeAuthByID"}, async()=>{
    //         try {
    //             const query: DeleteSingleAuthQuery = {collection_name:this.collection_name, filter:auth_id_filter}
    //             const reslut = await MongoGenericQueris.deleteSingle<Auth>(query)
    //         } catch (error) {
    //             if((error as StructuedError).type == "document was not deleted")
    //                 throw create_error("no auth found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
    //             throw error
    //         }
    //     })}

}