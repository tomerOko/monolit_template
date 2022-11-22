import {MongoInitializer} from  './utilities/monogoConnection'
import { Server } from "./server";
import { config } from "./config/confing_mock";




const indexAsync = async()=>{
    const db = await MongoInitializer.connectOrGetActiveConnection(config.mongo.MONGO_URI)
    await MongoInitializer.createCollections(config.mongo.expected_collections, db) 
    console.log("hallwo")
}

console.log("proggram stating")
indexAsync()
