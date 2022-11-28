import { wrap } from "../../../utilities/function_wrapping";
import { CreateManyResult, ReadResult } from "../../../utilities/mongo_generic_queris";
import { CommunityDAL } from "../dal/community_dal";
import { Community, CommunityIdFilter } from "../types/community_types";

type This = InstanceType<typeof CommunityService>

export class CommunityService {

    constructor( private community_dal: CommunityDAL = new CommunityDAL()) {}

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



    })}

    public getCommunityById = async (filter: CommunityIdFilter):Promise<Community> => {
    return await wrap<This["getCommunityById"]>({name:"CommunityService/createCommunity"}, async()=>{
        const community = await this.community_dal.getCommunityBy({token: filter.token})
        if (community.length == 0) throw new Error("community wasnt found");
        if (community.length>1) throw new Error("more then one community found with the same id");
        return community[0]
    })}





    
}