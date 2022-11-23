import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { logger } from "../../../utilities/logger";

type This = typeof UserUtils
export class UserUtils {

    public static parseUserResponse():void{
    return wrapSync<This["parseUserResponse"]>({name: "UserUtils/parseUserResponse"}, ()=>{

        //some utils machanism
        
    })}}