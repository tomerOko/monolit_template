import { MongoInitializer } from "./utilities/monogo_connection";
import { Server } from "./server";
import { config } from "./config/confing_mock";
import {wrap} from './utilities/function_wrapping'
import { logger } from "./utilities/logger";


type This = typeof Index

class Index {


    static async boot():Promise<void>{await wrap<This['boot']>({name: 'Index/boot'} ,async() =>{ 
        await Index.initizalizeMongo(); 
        Server.initizalize()
    })}


    static async initizalizeMongo():Promise<void>{
    await wrap<This['initizalizeMongo']>({name: 'Index/initizalizeMongo'},async() =>{ 
        const db = await MongoInitializer.connectOrGetActiveConnection(config.system.mongo.connection_props);
        await MongoInitializer.createCollections(config.system.mongo.expected_collections, db);
    })}
}


logger.info("proggram stating")
Index.boot()
