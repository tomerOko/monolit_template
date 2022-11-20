import dotenv from 'dotenv'
import {MongoInitialize} from  './util/monogoConnection'
import { Server } from "./server";



const indexAsync = async()=>{
    dotenv.config({path: "/app/src/config/configs.env"});
    const db = await MongoInitialize.connectOrGetActiveConnection()
    //TODO: this list shuld be inside config
    const collections = ['members', 'posts', 'communities']
    await MongoInitialize.createCollections(collections, db) 
}

console.log("i am working")
indexAsync()
