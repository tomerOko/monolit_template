import { wrap, wrapSync } from "../../../utilities/functionWrapping";
import { logger } from "../../../utilities/logger";

type This = InstanceType<typeof UserService>
export class UserService {

    constructor(parameters) {}


    public async createUser():Promise<void>{
    return await wrap<This["createUser"]>(async()=>{

        //do logic
        //call db service
        //do logic
        //return reuslt

    },[],"UserService/createUser")}
}