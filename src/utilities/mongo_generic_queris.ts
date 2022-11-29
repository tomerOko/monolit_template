import { wrap, wrapSync } from "./function_wrapping";
import { Document, Filter, FindOneAndUpdateOptions, OptionalId, OptionalUnlessRequiredId, Sort, UpdateFilter, UpdateOptions } from "mongodb";
import { MongoInitializer } from "./monogo_connection";
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, CreateSinleResult, DeleteManyResult, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, ReadSinleResult, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../types/mongo_generic_types";
import { create_error } from "../errors/error_factory";


type This = typeof MongoGenericQueris
export class MongoGenericQueris{


  public static async createSinlge<T extends Document>(query: CreateSingleQuery<T>):Promise<void>{
return await wrap<This['createSinlge']>({name: "MongoGenericQueris/createSinlge"}, async()=>{
  
  const collection = await MongoInitializer.getCollection<T>(query.collection_name);
  const query_result = await collection.insertMany([query.value] as OptionalUnlessRequiredId<T>[]);
  const inserted = query_result.insertedCount==1
  if(!inserted) throw create_error('document was not created')
  })}


  public static async createMany<T extends Document>(query: CreateManyQuery<T>):Promise<CreateManyResult>{
return await wrap<This['createMany']>({name: "MongoGenericQueris/createMany"}, async()=>{
    
  const collection = await MongoInitializer.getCollection<T>(query.collection_name);
  const query_result = await collection.insertMany(query.values as OptionalUnlessRequiredId<T>[]);
  const inserted = query_result.insertedCount
  const blocked_by_index = query.values.length - inserted
  return {inserted}
    
  })}


  public static async readManyBy<T extends Document>(query:ReadManyQuery<T>):Promise<ReadManyResult<Document>> {
return await wrap<This["readManyBy"]>({name: "MongoGenericQueris/readManyBy"}, async()=>{

  const collection = await MongoInitializer.getCollection<T>(query.collection_name)
  if (!query.limit) query.limit = 0;
  if (!query.sort) query.sort = {}
  const result = await collection.find<T>(query.filter).toArray()
  return result 

  })}


  public static async readSingleBy<T extends Document>(query:ReadSingleQuery<T>):Promise<ReadSinleResult<T>> { 
  return await wrap<This["readSingleBy"], Promise<ReadSinleResult<T>>>({name: "MongoGenericQueris/readSingleBy"}, async()=>{

    const collection = await MongoInitializer.getCollection<T>(query.collection_name)
    const result = await collection.findOne<T>(query.filter)
    if(!result) throw create_error("document was not found")
    return result

  })}


  public static async readAll<T extends Document> (collection_name:string): Promise<ReadManyResult<Document>>{ 
return await wrap<This["readAll"]>({name: "MongoGenericQueris/readAll"}, async() => {
  
  const collection = await MongoInitializer.getCollection<T>(collection_name);
  const result = await collection.find().toArray();
  return result;

  })}


  public static async updateSingle<T extends Document>(query:UpdateQuery<T>):Promise<UpdateSinleResult>{
  return await wrap<This['updateSingle']>({name: "MongoGenericQueris/updateSingle"}, async () => {

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const { update_values, options } = await MongoGenericQueris.parseUpdateValuesAndOptions<T>(query);
    const query_result = await collection.updateOne(query.filter, update_values, options)
    const result: UpdateSinleResult = {
      matched:query_result.matchedCount>0,
      upserted:query_result.modifiedCount>0,
      updated:query_result.upsertedCount>0
    }
    return result

  })}

  public static async updateMany<T extends Document>(query:UpdateQuery<T>):Promise<UpdateManyResult>{
  return await wrap<This['updateMany']>({name: "MongoGenericQueris/updateMany"}, async () => {
    
    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const { update_values, options } = await MongoGenericQueris.parseUpdateValuesAndOptions<T>(query);
    const query_result = await collection.updateMany(query.filter, update_values,options)
    const result:UpdateManyResult = {
      mutched: query_result.matchedCount,
      updated: query_result.modifiedCount,
      upserted: query_result.upsertedCount
    }
    return result
    
  })}

  private static async parseUpdateValuesAndOptions<T extends Document>(query: UpdateQuery<T>) {
  return wrapSync<This["parseUpdateValuesAndOptions"]>({name:"MongoGenericQueris/parseUpdateValuesAndOptions"}, () => {

    const options: UpdateOptions = {};
    if (query.upsert) options.upsert = query.upsert;
    const update_values = { $set: query.update_values } as UpdateFilter<T>;
    return {update_values, options };

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









