import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { logger } from "../../../utilities/logger";

type This = typeof CommunityUtils
export class CommunityUtils {

    public static parseCommunityResponse():void{
    return wrapSync<This["parseCommunityResponse"]>({name: "CommunityUtils/parseCommunityResponse"}, ()=>{

        //some parsing machanism
        
    })}

    public static validateCommunityTiltleLength():void{
        return wrapSync<This["parseCommunityResponse"]>({name: "CommunityUtils/parseCommunityResponse"}, ()=>{
    
            //some parsing machanism
            
    })}
}