import dotenv from 'dotenv'
import {MongoInitializer} from  './utilities/monogoConnection'
import { Server } from "./server";



const indexAsync = async()=>{
    dotenv.config({path: "/app/config/config.env"});
    const db = await MongoInitializer.connectOrGetActiveConnection()
    //TODO: this list shuld be inside config
    const collections = ['members', 'posts', 'communities']
    await MongoInitializer.createCollections(collections, db) 
}

console.log("proggram stating")
indexAsync()
