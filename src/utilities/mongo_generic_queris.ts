import { wrap, wrapSync } from "./function_wrapping";
import { Document, Filter, FindOneAndUpdateOptions, OptionalId, OptionalUnlessRequiredId, Sort, UpdateFilter, UpdateOptions, UpdateResult } from "mongodb";
import { MongoInitializer } from "./monogo_connection";
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, DeleteManyResult, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, ReadSinleResult, UpdateManyResult, UpdateParams, UpdateQuery, UpdateSinleResult } from "../types/mongo_generic_types";
import { create_error } from "../errors/error_factory";


type This = typeof MongoGenericQueris
export class MongoGenericQueris{

  public static async createSinlge<T extends Document>(query: CreateSingleQuery<T>):Promise<void>{
  return await wrap<This["createSinlge"]>({name: "MongoGenericQueris/createSinlge"}, async()=>{

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const query_result = await collection.insertMany([query.value] as OptionalUnlessRequiredId<T>[]);
    const inserted = query_result.insertedCount==1
    if(!inserted) throw create_error('document was not created')

  })}


  public static async createMany<T extends Document>(query: CreateManyQuery<T>):Promise<CreateManyResult>{
  return await wrap<This["createMany"]>({name: "MongoGenericQueris/createMany"}, async()=>{

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const query_result = await collection.insertMany(query.values as OptionalUnlessRequiredId<T>[]);
    const inserted = query_result.insertedCount
    const blocked_by_index = query.values.length - inserted
    return {inserted}

  })}


  public static async readSingleBy<T extends Document>(query:ReadSingleQuery<T>):Promise<ReadSinleResult<T>> { 
  return await wrap<This["readSingleBy"], Promise<ReadSinleResult<T>>>({name: "MongoGenericQueris/readSingleBy"}, async()=>{

    const collection = await MongoInitializer.getCollection<T>(query.collection_name)
    const result = await collection.findOne<T>(query.filter)
    if(!result) throw create_error("document was not found")
    return result

  })}


  public static async readManyBy<T extends Document>(query:ReadManyQuery<T>):Promise<ReadManyResult<T>> {
  return await wrap<This["readManyBy"], Promise<ReadManyResult<T>> >({name: "MongoGenericQueris/readManyBy"}, async()=>{

    const collection = await MongoInitializer.getCollection<T>(query.collection_name)
    if (!query.limit) query.limit = 0;
    if (!query.sort) query.sort = {}
    const result = await collection.find<T>(query.filter).toArray()
    return result

  })}


  public static async readAll<T extends Document> (collection_name:string): Promise<ReadManyResult<T>>{ 
  return await wrap<This["readAll"], Promise<ReadManyResult<T>>>({name: "MongoGenericQueris/readAll"}, async() => {

    const collection = await MongoInitializer.getCollection<T>(collection_name);
    const result = await collection.find<T>({}).toArray();
    return result;

  })}


  public static async updateSingle<T extends Document>(query:UpdateQuery<T>):Promise<UpdateSinleResult>{
  return await wrap<This['updateSingle']>({name: "MongoGenericQueris/updateSingle"}, async () => {

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const update_params = await MongoGenericQueris.parseUpdateQuery<T>(query);
    const query_result = await collection.updateOne(update_params.filter, update_params.update, update_params.options)
    const result: UpdateSinleResult = MongoGenericQueris.buildUpdateSingleResult(query_result)
    return result

  })}


  public static async updateMany<T extends Document>(query:UpdateQuery<T>):Promise<UpdateManyResult>{
  return await wrap<This['updateMany']>({name: "MongoGenericQueris/updateMany"}, async () => {
    
    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const update_params = await MongoGenericQueris.parseUpdateQuery<T>(query);
    const query_result = await collection.updateMany(update_params.filter, update_params.update, update_params.options) as UpdateResult
    const result:UpdateManyResult = MongoGenericQueris.buildUpdateManyResult(query_result)
    return result
    
  })}


  public static async deleteSingle<T extends Document> (query:DeleteQuery<T>): Promise<DeleteSingleResult>{
  return await wrap<This["deleteSingle"]>({name: "MongoGenericQueris/deleteSingle"}, async () => {

    const delete_result = await this.delete(query, true)
    const result: DeleteSingleResult = {deleted: delete_result.deleted_count==1}
    return result

  })}


  public static async deleteMany<T extends Document> (query:DeleteQuery<T>): Promise<DeleteManyResult>{
  return await wrap<This["deleteMany"]>({name: "MongoGenericQueris/deleteMany"}, async () => {

    const delete_result =  await this.delete(query, false)
    return delete_result

  })}


  private static buildUpdateSingleResult(query_result: UpdateResult): UpdateSinleResult {
  return wrapSync({name: 'MongoGenericQueris/buildUpdateSingleResult'}, () => {
    
    return {
      matched: query_result.matchedCount > 0,
      upserted: query_result.modifiedCount > 0,
      updated: query_result.upsertedCount > 0
    };

  })}


  private static buildUpdateManyResult(query_result: UpdateResult): UpdateManyResult {
  return wrapSync({name:'MongoGenericQueris/buildUpdateManyResult'}, ()=>{
   
    return {
      mutched: query_result.matchedCount,
      updated: query_result.modifiedCount,
      upserted: query_result.upsertedCount
    };

  })}


  private static parseUpdateQuery<T extends Document>(query: UpdateQuery<T>): UpdateParams<T> {
  return wrapSync<This["parseUpdateQuery"], UpdateParams<T>>({name:"MongoGenericQueris/parseUpdateValuesAndOptions"}, () => {

    const options: UpdateOptions = {};
    if (query.upsert) options.upsert = query.upsert;
    const update_values = { $set: query.update_values } as UpdateFilter<T>;
    const update_params: UpdateParams<T> = {filter: query.filter,update: update_values, options}
    return update_params

  })}


  private static async delete<T extends Document> (query:DeleteQuery<T>, is_single: boolean): Promise<{deleted_count:number}>{
  return await wrap<This["delete"]>({name: "MongoGenericQueris/delete"}, async () => {
  
    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    let query_result;
    if (is_single) {
      query_result = await collection.deleteOne(query.filter)
    }else{
      query_result = await collection.deleteMany(query.filter)
    }
    const delete_result= { deleted_count:query_result.deletedCount}
    return delete_result

  })}

}









