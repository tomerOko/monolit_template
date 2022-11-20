
import http from 'http';
import { app } from './app'


export class Server {

  public static async initizalize() {
    const httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT, () => console.log(`Server is running on default host :${process.env.PORT}`));
  }

}











