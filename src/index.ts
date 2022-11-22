import {MongoInitializer} from  './utilities/monogoConnection'
import { Server } from "./server";
import { config } from "./config/confing_mock";
import {wrap} from './utilities/functionWrapping'
import { logger } from "./utilities/logger";


type This = typeof Index

class Index {


    static async boot():Promise<void>{
    await wrap<This['boot']>(async() =>{ 

        await Index.initizalizeMongo(); 
        Server.initizalize()

    },[], 'Index/boot')}


    static async initizalizeMongo():Promise<void>{
    await wrap<This['initizalizeMongo']>(async() =>{ 
        
        const db = await MongoInitializer.connectOrGetActiveConnection(config.mongo.MONGO_URI);
        await MongoInitializer.createCollections(config.mongo.expected_collections, db);

    },[], 'Index/initizalizeMongo')}
}


logger.info("proggram stating")
Index.boot()
