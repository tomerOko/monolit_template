import { z } from "zod"
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../../../types/mongo_generic_types"
import { User } from "../../users/types/users_types"
import { change_community_role_schema, create_community_schema, delete_community_by_id_schema, get_community_by_id_schema, update_community_changable_properties_schema } from "../validations/communities_validations"


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


//HTTP types (controller level):
//requests:
export type CreateCommunityRequest = z.infer<typeof create_community_schema>["body"]
export type getCommunityByIdRequest = z.infer<typeof get_community_by_id_schema>["params"]
export type UpdateCommunityChangablePropertiesRequest = z.infer<typeof update_community_changable_properties_schema>
export type deleteCommunityByIdRequest = z.infer<typeof delete_community_by_id_schema>["params"]
export type ChangeCommunityRoleRequest = z.infer<typeof change_community_role_schema>

//responses:
export type CreateSingleCommunityRespose = {
    created: Community,
}
export type GetSingleCommunityResponse= {
    community: Community,
}
export type GetManyCommunitiesResponse = {
    communities: Community[]
}
export type UpdateSingleCommunityResponse= {
    updated_community: Community,
}
export type UpdateManyCommunitiesResponse= {
    found: number,
    updated: number,
    upserted: number
}
export type DeleteSingleCommunityResponse= {
    deleted_community: Community,
}
export type DeleteManyCommunitiesResponse= {
    deleted: number,
}
export type ChangeCommunityRoleResponse = UpdateSingleCommunityResponse



//Logic types - any additional types needed through the service or helpers
export type CommunityChangeableProperties = UpdateCommunityChangablePropertiesRequest["body"]



//DB types - an customization of the generic types (DAL level)
//queries:
export type CommunityFilter = Partial<Community>
export type CommunityFilterByID = {token: string}
export type CreateSingleCommunityQuery = CreateSingleQuery<Community>
export type CreateManyCommunitiesQuery = CreateManyQuery<Community>
export type ReadSingleCommunityQuery = ReadSingleQuery<Community>
export type ReadManyCommunityQuery = ReadManyQuery<Community>
export type UpdateSingleCommunityQuery = UpdateQuery<Community>
export type UpdateManyCommunityQuery = UpdateQuery<Community>
export type DeleteSingleCommunityQuery = DeleteQuery<Community>
export type DeleteManyCommunityQuery = DeleteQuery<Community>

//results:
//there are no types for single document createion and deletion because it will work correctly or throw error
export type CreateManyCommunitiesResult = CreateManyResult
export type ReadSingleCommunityResult = Community
export type ReadManyCommunitiesResult = ReadManyResult<Community>
export type UpdateSingleCommunityResult = UpdateSinleResult
export type UpdatedManyCommunitiesResult = UpdateManyResult
export type DeleteCommunitiesResult = DeleteSingleResult



/**
 * the system needs to support hundreds of communities in the foreseeable future.
 */


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