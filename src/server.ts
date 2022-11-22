
import http from 'http';
import { app } from './app'
import { wrap } from './utilities/functionWrapping';
import { config } from "./config/confing_mock";

type This = typeof Server

export class Server {


  public static async initizalize():Promise<void> {
  await wrap<This["initizalize"]>(async ()=>{

    const httpServer = http.createServer(app);
    const port = config.api_server.port
    httpServer.listen(port, () => console.log(`Server is running on default host :${port}`));

  },[],"Server/initizalize")}


}











