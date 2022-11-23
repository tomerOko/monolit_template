import { wrap , wrapSync} from '../utilities/functionWrapping'
import {Collection, Db,MongoClient} from 'mongodb'

interface MongoActiveConnectionStore {
  connection: MongoClient | undefined,
    db: Db | undefined
}

const mongo: MongoActiveConnectionStore = {
  connection: undefined,
  db: undefined
}

type This = typeof MongoInitializer


export class MongoInitializer {



  /**
   * @param connection_string - expected to specify a specific database
   * @summary if createConnection wasnt execute, this class will use process.env.MONGO_URI as connection string
   * if connections axist it dose not recreate
   */
  public static async connectOrGetActiveConnection (connection_string ? : string): Promise < Db > {
    return await wrap<This['connectOrGetActiveConnection']>(async(connection_string) => { 
      
      if (mongo.connection == undefined)
        await MongoInitializer.createConnection(connection_string)
      return mongo.db as Db

  },[connection_string], 'MongoInitializer/connectOrGetActiveConnection',{hide_params: true, hide_result: true})}


  //TODO: any shuld be 'T'
  public static async getCollection<T>(collection_name: string): Promise <Collection<any>> {
  return await wrap<This['getCollection']>(async(collection_name) => { 
      
      const db = await MongoInitializer.connectOrGetActiveConnection()
      const collection = db.collection<T>(collection_name);
      return collection as Collection<T>

  },[collection_name], 'MongoInitializer/getCollection',{hide_params: true, hide_result: true})}


  private static async createConnection (connection_string ? : string): Promise<void> {
  return await wrap<This['createConnection']>(async(connection_string) => { 
      
      connection_string = MongoInitializer.checkConnectionString(connection_string)
      mongo.connection = await new MongoClient(connection_string, {connectTimeoutMS:1000}).connect()
      mongo.db = await mongo.connection.db()

  },[connection_string], 'MongoInitializer/createConnection', {hide_params: true, hide_result: true})}



  private static checkConnectionString(connection_string: undefined | string): string {
  return wrapSync <This['checkConnectionString']>((connection_string) => { 

    if (connection_string == undefined) {
      if (process.env.MONGO_URI == undefined)
        throw new Error("no mongo connection string supplied")
      return process.env.MONGO_URI
    }
    return connection_string

  },[connection_string], 'MongoInitializer/checkConnectionString', {hide_params: true, hide_result: true})}



  /**
   * @param collections - a list of collections our code expect
   */
  public static async createCollections (expected_collections: Array<string>, db:Db ): Promise < void > {
  return await wrap<This['createCollections']>(async(expected_collections) => { 

      const collections_to_create = await MongoInitializer.missingCollections(expected_collections, db)
      await Promise.all(collections_to_create.map(collection_name => db.createCollection(collection_name)))

  },[expected_collections, db], 'MongoInitializer/createCollections', {hide_params: true, hide_result: true})}


  private static async missingCollections (expected_collections: Array < string > , db: Db): Promise < Array < string >> {
    return await wrap<This['missingCollections']>(async(connection_string) => { 

    const existing_collections = await db.listCollections().toArray()
    const existing_collections_names = existing_collections.map(coll => coll.name);
    const names_as_set = new Set(existing_collections_names);
    const missing_collections = expected_collections.filter(name => !names_as_set.has(name));
    return missing_collections;

  },[expected_collections, db], 'MongoInitializer/missingCollections', {hide_params: true, hide_result: true})}
}











// const result = await db.collection("replicaset_mongo_client_collection").find({})

//     await client.close();

//     const database = await client.db('test'); 
//     const usersCollection = await database.collection("users"); //     db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { name: 'Bill' };
//     const user = await usersCollection.findOne(query);


//check if collection exist


// const collection = await client.db(dbName).listCollections({}, { nameOnly: true }).toArray()