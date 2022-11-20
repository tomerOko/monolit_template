import {Db,MongoClient} from 'mongodb'

interface MongoActiveConnectionStore {
  connection: MongoClient | undefined,
    db: Db | undefined
}

const mongo: MongoActiveConnectionStore = {
  connection: undefined,
  db: undefined
}

export class MongoInitializer {

  /**
   * @param connection_string - expected to specify a specific database
   * @summary if createConnection wasnt execute, this class will use process.env.MONGO_URI as connection string
   * if connections axist it dose not recreate
   */
  public static connectOrGetActiveConnection = async (connection_string ? : string): Promise < Db > => {
    if (mongo.connection == undefined)
      await MongoInitializer.createConnection(connection_string)
    return mongo.db as Db
  }

  private static createConnection = async (connection_string ? : string) => {
    connection_string = MongoInitializer.checkConnectionString(connection_string)
    try {
      mongo.connection = await new MongoClient(connection_string).connect()
      mongo.db = await mongo.connection.db()
    } catch (error) {
      throw new Error()
    }
  }

  private static checkConnectionString = (connection_string: undefined | string): string => {
    if (connection_string == undefined) {
      if (process.env.MONGO_URI == undefined) {
        throw new Error("no mongo connection string supplied")
      }
      return process.env.MONGO_URI
    }
    return connection_string
  }

  /**
   * @param collections - a list of collections our code expect
   * 
   */
     public static createCollections = async (expected_collections: Array<string>, db:Db ): Promise < void > => {
      const collections_to_create = await MongoInitializer.missingCollections(expected_collections, db)
      await Promise.all(collections_to_create.map(collection_name => db.createCollection(collection_name)))
    }
  

  private static missingCollections = async (expected_collections: Array < string > , db: Db): Promise < Array < string >> => {
    const existing_collections = await db.listCollections().toArray()
    const existing_collections_names = existing_collections.map(coll => coll.name);
    const names_as_set = new Set(existing_collections_names);
    const missing_collections = expected_collections.filter(name => !names_as_set.has(name));
    return missing_collections;
  }
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