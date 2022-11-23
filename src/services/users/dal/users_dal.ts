import { wrap, wrapSync } from "../../../utilities/functionWrapping";
import { logger } from "../../../utilities/logger";

type This = InstanceType<typeof UserDAL>
export class UserDAL {

    public async createUser():Promise<void>{
    return await wrap<This["createUser"]>(async()=>{

        //user generic db calls
        
    },[],"UserService/createUser")}
}