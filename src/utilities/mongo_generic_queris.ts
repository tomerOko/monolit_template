import { wrap } from "./functionWrapping";
import { Filter, OptionalId, Sort, WithId } from "mongodb";
import { MongoInitializer } from "./monogoConnection";


export type InsertResult = {
  inserted:number,
  blocked_by_index: number
}

export type upsertResult = {
  inserted:number,
  updated: number,
  blocked_by_index: number
}
export type updateResult = {
  updated:number,
  blocked_by_index: number
}
export type readResult<T> = Array<WithId<T>>
export type DeleteResult = {
  deleted:number
} 

export type QueryCollection = string
export type QueryValues<T> = Array<OptionalId<T>> 
export type FilterQuery<T> = {
  collection_name: QueryCollection,
  filter: Filter<T>
  sort?: Sort,
  limit?: number
}
export type ValuesQuery<T> = {
  collection_name: QueryCollection,
  values: QueryValues<T>
}
export type CompleteQuery<T> = FilterQuery <T> & ValuesQuery <T>



type This = typeof MongoGenericQueris
export class MongoGenericQueris{



  public static async readAll<T> (collection_name:QueryCollection): Promise<any>{
    return await wrap<This["readAll"]>(async(collection_name) => {
  
      const db = await MongoInitializer.connectOrGetActiveConnection()
      const collection = db.collection<T>(collection_name);
      const result = await collection.find().toArray();
      return result;

    },[collection_name],'')}


  public static async deleteMany<T> (query:FilterQuery<T>): Promise<DeleteResult>{
  return await wrap<This["deleteMany"]>(async (query) => {

    const db = await MongoInitializer.connectOrGetActiveConnection()
    const collection = db.collection<T>(query.collection_name);
    const deleteResult = await collection.deleteMany(query.filter);
    const delete_result: DeleteResult = {deleted:deleteResult.deletedCount}
    return delete_result

  },[query],'')}


  public static async deleteOne<T> (query:FilterQuery<T>): Promise<DeleteResult>{
  return await wrap<This["deleteMany"]>(async (query) => {

      const db = await MongoInitializer.connectOrGetActiveConnection()
      const collection = db.collection<T>(query.collection_name);
      const deleteResult = await collection.deleteOne(query.filter as Filter<T>);
      const delete_result: DeleteResult = {deleted:deleteResult.deletedCount}
      return delete_result

    },[query],'')}






}




export const createOrUpdate = async <T>(
  collectionName: string,
  term: object,
  value: OptionalId<T>
): Promise<T | undefined> => {
  const { client, database } = await dbConnect();

  try {
    const db = client.db(database);
    const collection = db.collection<T>(collectionName);

    // nb : upsert either
    // + Creates a new document if no documents match the filter. Returns null after inserting the new document, unless returnNewDocument is true.
    // + Updates a single document that matches the filter.

    const result = await collection.findOneAndUpdate(
      term,
      { $set: value as MatchKeysAndValues<T> },
      { upsert: true, returnOriginal: false }
    );
    if (result.ok === 1) return result.value;

    return undefined;
  } catch (err) {
    throw { ...err, message: err.message };
  } finally {
    await client.close();
  }
};






export const create = async <T>(
  collectionName: string,
  value: OptionalId<T>
): Promise<ObjectId | undefined> => {
  const { client, database } = await dbConnect();

  try {
    const db = client.db(database);
    const collection = db.collection<T>(collectionName);

    const result = await collection.insertOne(value);
    if (result.insertedCount === 1) return result.insertedId as ObjectId;

    return undefined;
  } catch (err) {
    throw { ...err, message: err.message };
  } finally {
    await client.close();
  }
};


