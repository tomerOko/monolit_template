import { wrap } from "./function_wrapping";
import { Document, Filter, FindOneAndUpdateOptions, OptionalId, Sort, UpdateFilter } from "mongodb";
import { MongoInitializer } from "./monogo_connection";
import { CreateManyResult, CreateSingleQuery, DeleteManyesult, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../types/mongo_generic_types";



type This = typeof MongoGenericQueris
export class MongoGenericQueris{


  public static async createMany<T extends Document>(query: CreateSingleQuery<T>):Promise<CreateManyResult>{
      return await wrap<This['createMany']>({name: "MongoGenericQueris/createMany"}, async()=>{
    
          const collection = await MongoInitializer.getCollection<T>(query.collection_name);
          const query_result = await collection.insertMany(query.values);
          const inserted = query_result.insertedCount
          const blocked_by_index = query.values.length - inserted
          return {blocked_by_index,inserted}
    
  })}


  public static async readManyBy<T extends Document>(query:ReadManyQuery<T>):Promise<ReadManyResult<Document>> {
  return await wrap<This["readManyBy"]>({name: "MongoGenericQueris/readManyBy"}, async()=>{
      const collection = await MongoInitializer.getCollection<T>(query.collection_name)
      if (!query.limit) query.limit = 0;
      if (!query.sort) query.sort = {}
      const result = await collection.find<T>(query.filter).toArray()
      return result 
  })}


  public static async readSingleBy<T extends Document>(query:ReadSingleQuery<T>):Promise<Document | null> { 
    return await wrap<This["readSingleBy"]>({name: "MongoGenericQueris/readSingleBy"}, async()=>{
        const collection = await MongoInitializer.getCollection<T>(query.collection_name)
        const result = await collection.findOne<T>(query.filter)
        return result
    })
  }


  public static async readAll<T extends Document> (collection_name:string): Promise<ReadManyResult<Document>>{ 
  return await wrap<This["readAll"]>({name: "MongoGenericQueris/readAll"}, async() => {
  
    const collection = await MongoInitializer.getCollection<T>(collection_name);
    const result = await collection.find().toArray();
    return result;

  })}


  



  //TODO: all the function below are not ready
  //TODO: deleteMany/deleteSinle are almost identical, maybe the shuld be one?
  //TODO: dupdateMany/updateSinle are almost identical, maybe the shuld be one?
  public static async updateSingle<T extends Document>(query:UpdateQuery<T>):Promise<UpdateManyResult>{
  return await wrap<This['updateSingle']>({name: "MongoGenericQueris/updateSingle"}, async () => {

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const options: FindOneAndUpdateOptions = {upsert: query.upsert}
    const query_result = await collection.findOneAndUpdate(query.filter,{$set:query.update_properties}, options)
    const result: UpdateSinleResult = {
      matched: query_result.ok === 1
    }
    return result

  })}


  public static async updateMany<T extends Document>(query:UpdateQuery<T>):Promise<UpdateManyResult>{
  return await wrap<This['updateMany']>({name: "MongoGenericQueris/updateMany"}, async () => {

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const query_result = await collection.updateMany(query.filter, query.update_properties as UpdateFilter<any>)
    const result:UpdateManyResult = {
      mutched : query_result.matchedCount,
      updated : query_result.modifiedCount,
    }
    return result

  })}

  public static async deleteSingle<T extends Document> (query:DeleteQuery<T>): Promise<DeleteSingleResult>{
  return await wrap<This["deleteSingle"]>({name: "MongoGenericQueris/deleteSingle"}, async () => {
    return await this.delete(query, true)
  })}

  public static async deleteMany<T extends Document> (query:DeleteQuery<T>): Promise<DeleteManyesult>{
  return await wrap<This["deleteMany"]>({name: "MongoGenericQueris/deleteMany"}, async () => {
    return await this.delete(query, false)
  })}


  private static async delete<T extends Document> (query:DeleteQuery<T>, is_single: boolean): Promise<DeleteResult>{
    return await wrap<This["deleteMany"]>({name: "MongoGenericQueris/deleteMany"}, async () => {
      const collection = await MongoInitializer.getCollection<T>(query.collection_name);
      let query_result;
      if (is_single) {
        query_result = await collection.deleteOne(query.filter)
      }else{
        query_result = await collection.deleteMany(query.filter)
      }
      const delete_result: DeleteManyesult = {deleted:query_result.deletedCount}
      return delete_result
    })}


}

type DeleteResult = {/*TODO:*/}










