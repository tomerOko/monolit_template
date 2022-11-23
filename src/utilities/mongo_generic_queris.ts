import { wrap } from "./function_wrapping";
import { Filter, FindOneAndUpdateOptions, OptionalId, Sort, UpdateFilter } from "mongodb";
import { MongoInitializer } from "./monogo_connection";


export type CreateManyResult = {
  inserted:number,
  blocked_by_index: number
}

export type ReadResult<T> = Array<T>

export type UpdateManyResult = {
  mutched:number,
  updated:number,
}

export type UpdateOneResult = {
  matched:boolean,
}

export type DeleteResult = {
  deleted:number
} 



export type QueryCollection = string
export type Documents<T> = Array<OptionalId<T>> 

export type CreateQuery<T> = {
  collection_name:string,
  values:T[]
}

export type BasicQuery<T> = {
  collection_name:string,
  filter: Filter<T>,
}

export type ReadQuery<T> = BasicQuery<T> & {
  sort?: Sort,
  limit?: number
}

export type UpdateManyQuery<T> = BasicQuery<T> & {
  update_properties: UpdateFilter<T>
}

export type UpdateOneQuery<T> = BasicQuery<T> & {
  upsert:boolean,
  update_properties: UpdateFilter<T>
}

export type DeleteQuery<T> = BasicQuery<T> & {
  delete_many: boolean
}



type This = typeof MongoGenericQueris
export class MongoGenericQueris{

    public static async createMany<T>(query: CreateQuery<T>):Promise<CreateManyResult>{
      return await wrap<This['createMany']>({name: "MongoGenericQueris/createMany"}, async()=>{
    
          const collection = await MongoInitializer.getCollection<T>(query.collection_name);
          const query_result = await collection.insertMany(query.values);
          const inserted = query_result.insertedCount
          const blocked_by_index = query.values.length - inserted
          return {blocked_by_index,inserted}
    
    })}


  public static async readBy<T>(query:ReadQuery<T>):Promise<ReadResult<any>> { //the use of any is because know issue with typescript compiler (@see: https://stackoverflow.com/questions/72627255/t-could-be-instantiated-with-an-arbitrary-type-which-could-be-unrelated-to-t)
  return await wrap<This["readBy"]>({name: "MongoGenericQueris/readBy"}, async()=>{

      const collection = await MongoInitializer.getCollection<T>(query.collection_name)
      if (!query.limit) query.limit = 0;
      if (!query.sort) query.sort = {}
      const result = await collection.find<T>({}).toArray()
      return result 

  })}


  public static async readAll<T> (collection_name:QueryCollection): Promise<ReadResult<any>>{ //the use of any is because know issue with typescript compiler (@see: https://stackoverflow.com/questions/72627255/t-could-be-instantiated-with-an-arbitrary-type-which-could-be-unrelated-to-t)
    return await wrap<This["readAll"]>({name: "MongoGenericQueris/readAll"}, async() => {
  
      const collection = await MongoInitializer.getCollection<T>(collection_name);
      const result = await collection.find().toArray();
      return result;

  })}

  
  public static async updateMany<T>(query:UpdateManyQuery<T>):Promise<UpdateManyResult>{
  return await wrap<This['updateMany']>({name: "MongoGenericQueris/updateMany"}, async () => {

    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const query_result = await collection.updateMany(query.filter, query.update_properties as UpdateFilter<any>)
    const result:UpdateManyResult = {
      mutched : query_result.matchedCount,
      updated : query_result.modifiedCount,
    }
    return result

  })}


  public static async updateOne<T>(query:UpdateOneQuery<T>):Promise<UpdateOneResult>{
  return await wrap<This['updateOne']>({name: "MongoGenericQueris/updateOne"}, async()=>{
    const collection = await MongoInitializer.getCollection<T>(query.collection_name);
    const options: FindOneAndUpdateOptions = {upsert: query.upsert}
    const query_result = await collection.findOneAndUpdate(query.filter,{$set:query.update_properties}, options)
    const result: UpdateOneResult = {
      matched: query_result.ok === 1
    }
    return result
  })}


  public static async delete<T> (query:DeleteQuery<T>): Promise<DeleteResult>{
  return await wrap<This["delete"]>({name: "MongoGenericQueris/delete"}, async () => {
    const db = await MongoInitializer.connectOrGetActiveConnection()
    const collection = db.collection<T>(query.collection_name);
    let query_result;
    if (query.delete_many) {
      query_result = await collection.deleteMany(query.filter)
    }else{
      query_result = await collection.deleteOne(query.filter)
    }
    const delete_result: DeleteResult = {deleted:query_result.deletedCount}
    return delete_result
  })}

}










