import { logger } from "./utilities/logger";
import {wrap, wrapSync} from './utilities/function_wrapping'
import { MongoInitializer } from "./utilities/monogo_connection";
import { Server } from "./server";
import { config } from "./config/confing_mock";
import { secret_config } from "./config/secret_config_example";


class Index {


    static async boot():Promise<void>{
    await wrap({name: 'Index/boot'} ,async() =>{
        await Index.initizalizeMongo(); 
        Server.initizalize()
    })}


    static async initizalizeMongo():Promise<void>{
    await wrap({name: 'Index/initizalizeMongo'},async() =>{ 
        const db = await MongoInitializer.connectOrGetActiveConnection(config.system.mongo.connection_props);
        await MongoInitializer.createCollections(Object.values(config.system.mongo.collections), db);
    })}

}


logger.info("proggram stating")
Index.boot()
