
import http from 'http';
import { app } from './app'
import { wrap } from './utilities/function_wrapping';
import { config } from "./config/confing_mock";


export class Server {

  public static async initizalize():Promise<void> {
  await wrap({name:"Server/initizalize"}, async ()=>{

    const httpServer = http.createServer(app);
    const port = config.system.api_server.port
    httpServer.listen(port, () => console.log(`Server is running on default host :${port}`));

  })}

}











