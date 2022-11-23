import { wrap , wrapSync} from './function_wrapping'
import {Collection, Db ,Document,MongoClient} from 'mongodb'

type MongoActiveConnectionStore = {
  connection: MongoClient | undefined,
    db: Db | undefined
}

const mongo: MongoActiveConnectionStore = {
  connection: undefined,
  db: undefined
}

type ConnectionProps = {
  connection_string: string,
  databse_name: string
}

type This = typeof MongoInitializer


export class MongoInitializer {



  /**
   * @param connection_string - expected to specify a specific database
   * @summary if createConnection wasnt execute, this class will use process.env.MONGO_URI as connection string
   * if connections axist it dose not recreate
   */
  public static async connectOrGetActiveConnection (connection_props ? : ConnectionProps): Promise < Db > {
  return await wrap<This['connectOrGetActiveConnection']>({name:'MongoInitializer/connectOrGetActiveConnection', options: {hide_result: true}}, async() => { 
      if (mongo.connection == undefined)
        await MongoInitializer.createConnection(connection_props)
      return mongo.db as Db
  })}


  //TODO: any shuld be 'T'
  public static async getCollection<T extends Document>(collection_name: string): Promise <Collection<any>> {
  return await wrap<This['getCollection']>({name:'MongoInitializer/getCollection', options: {hide_result: true}}, async() => { 
      const db = await MongoInitializer.connectOrGetActiveConnection()
      const collection = db.collection<T>(collection_name);
      return collection 
  })}


  private static async createConnection (connection_props ? : ConnectionProps): Promise<void> {
  return await wrap<This['createConnection']>({name:'MongoInitializer/createConnection', options: {hide_result: true}}, async() => { 
      const connection_string = MongoInitializer.checkConnectionString(connection_props?.connection_string)
      mongo.connection = await new MongoClient(connection_string, {connectTimeoutMS:1000}).connect()
      mongo.db = await mongo.connection.db(connection_props?.databse_name)
  })}



  private static checkConnectionString(connection_string?: string): string {
  return wrapSync <This['checkConnectionString']>({name:'MongoInitializer/checkConnectionString', options: {hide_result: true}}, () => { 
    if (connection_string == undefined) {
      if (process.env.MONGO_URI == undefined)
        throw new Error("no mongo connection string supplied")
      return process.env.MONGO_URI
    }
    return connection_string
  })}



  /**
   * @param collections - a list of collections our code expect
   */
  public static async createCollections (expected_collections: Array<string>, db:Db ): Promise < void > {
  return await wrap<This['createCollections']>({name:'MongoInitializer/createCollections', options: {hide_result: true}},async() => { 
    const collections_to_create = await MongoInitializer.missingCollections(expected_collections, db)
    await Promise.all(collections_to_create.map(collection_name => db.createCollection(collection_name)))
  })}


  private static async missingCollections (expected_collections: Array < string > , db: Db): Promise < Array < string >> {
  return await wrap<This['missingCollections']>({name:'MongoInitializer/missingCollections', options: {hide_result: true}}, async() => { 
    const existing_collections = await db.listCollections().toArray()
    const existing_collections_names = existing_collections.map(coll => coll.name);
    const names_as_set = new Set(existing_collections_names);
    const missing_collections = expected_collections.filter(name => !names_as_set.has(name));
    return missing_collections;
  })}


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