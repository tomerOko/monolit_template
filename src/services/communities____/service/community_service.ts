import { wrap } from "../../../utilities/function_wrapping";
import { CreateManyResult, ReadResult } from "../../../utilities/mongo_generic_queris";
import { CommunityDAL } from "../dal/community_dal";
import { Community, CommunityIdFilter } from "../types/community_types";

type This = InstanceType<typeof CommunityService>

export class CommunityService {

    constructor( private community_dal: CommunityDAL = new CommunityDAL()) {}

    public createCommunity = async (community: Community):Promise<void> => {
    return await wrap<This["createCommunity"]>({name:"CommunityService/createCommunity"}, async()=>{
        const query_result = await this.community_dal.createCommunity(community)
    })}

    public getCommunityById = async (filter: CommunityIdFilter):Promise<Community> => {
    return await wrap<This["getCommunityById"]>({name:"CommunityService/createCommunity"}, async()=>{
        const community = await this.community_dal.getCommunityBy({token: filter.token})
        if (community.length == 0) throw new Error("community wasnt found");
        if (community.length>1) throw new Error("more then one community found with the same id");
        return community[0]
    })}





    
}