import { wrap, wrapSync } from "../../../utilities/functionWrapping";
import { logger } from "../../../utilities/logger";

type This = typeof UserUtils
export class UserUtils {

    public static parseUserResponse():void{
    return wrapSync<This["parseUserResponse"]>(()=>{

        //some utils machanism
        
    },[],"UserUtils/parseUserResponse")}}