import { User } from "../users____/types/users_types"

/**
 * the system needs to support hundreds of communities in the foreseeable future.
 */
 export type Community= {
    token: string, // identifier key
    title: string, // text with up to 60 chars
    image: URL, // For the purpose of this exercise, you don’t have to support image uploading and can assume it was already uploaded using a different system
    description: string,
    user_count: number, // number of users who joined this community
    users: User["token"][], //user list of the Communtiy
    date_created: Date,
    date_updated: Date
}


export type CommunityFilter = Partial<Community>
export type CommunityIdFilter = {token: string}

export type SingleCommunityRespose = {
    community?: Community,
    error?: any
}

/**
 * import { wrap, wrapSync } from "../../../utilities/function_wrapping";
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




    public createCommunity = async (community: Community):Promise<void> => {
    return await wrap<This["createCommunity"]>({name:"CommunityService/createCommunity"}, async()=>{

        //logic: 
        //validate title not exists
        //validate title dose not ave watchlist words
        //validate descriptrion dose not ave watchlist words
        //create Community

        //posible errors:
        //community title exist
        //community title contains watch list words
        //community description contains watch list words

        //object creation:
        //create token,
        //set date_created, date_updated to 'now'
        //set user_cout to 0
        //set users to []



        //DAL: 
        //create a function for createSingleCommunity
        //create an index for community title

 */