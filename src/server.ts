
import http from 'http';
import dotenv from 'dotenv'
import {MongoInitialize} from  './util/monogoConnection'
import {testConnection} from './models/UserModel'
import { rootRouter } from "./services/community/routes/All_API";
import { app } from './app'

export class name {

  public static async initizalize() {
    dotenv.config({path: "/app/src/config/configs.env"
  });
    const db = await MongoInitialize.connectOrGetActiveConnection()
    //TODO: this list shuld be inside config
    const collections = ['members', 'posts', 'communities']
    await MongoInitialize.createCollections(collections, db)

    const httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT, () => console.log(`Server is running on default host :${process.env.PORT}`));


  }

}











