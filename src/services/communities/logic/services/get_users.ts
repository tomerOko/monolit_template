
import { wrap } from "../../../../utilities/function_wrapping";
import { getCommunityByIdRequest, Community, CommunityFilter } from "../../types/communities_types";
import { CommunityLogic } from "../base_communities_logic_class";

type This = InstanceType<typeof GetCommunitiesService>

export class GetCommunitiesService extends CommunityLogic {

    constructor() {super()}

    public getSingleCommunityById = async (get_community_by_id_requst: getCommunityByIdRequest):Promise<Community> => {
    return await wrap<This["getSingleCommunityById"]>({name:"GetCommunitiesService/getSingleCommunityById"}, async()=>{
        const community_id = get_community_by_id_requst.community_id
        const community = await GetCommunitiesService.community_dal.getSinlgeCommunityByID({token: community_id})
        return community
    })}

    public getCommunitiesBy = async (filter: CommunityFilter ):Promise<Array<Community>> => {
    return await wrap<This["getCommunitiesBy"]>({name:"GetCommunitiesService/getCommunitiesBy"}, async()=>{
        const communities = await GetCommunitiesService.community_dal.getCommunitiesBy({token: filter.token})
        return communities
    })}
    
}