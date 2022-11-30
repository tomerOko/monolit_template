
import { wrap } from "../../../../utilities/function_wrapping";
import { getCommunityByIdRequest, Community, CommunityFilter } from "../../types/communitys_types";
import { CommunityLogic } from "../base_communitys_logic_class";

type This = InstanceType<typeof GetCommunitysService>

export class GetCommunitysService extends CommunityLogic {

    constructor() {super()}

    public getSingleCommunityById = async (get_community_by_id_requst: getCommunityByIdRequest):Promise<Community> => {
    return await wrap<This["getSingleCommunityById"]>({name:"GetCommunitysService/getSingleCommunityById"}, async()=>{
        const community_id = get_community_by_id_requst.community_id
        const community = await GetCommunitysService.community_dal.getSinlgeCommunityByID({token: community_id})
        return community
    })}

    public getCommunitysBy = async (filter: CommunityFilter ):Promise<Array<Community>> => {
    return await wrap<This["getCommunitysBy"]>({name:"GetCommunitysService/getCommunitysBy"}, async()=>{
        const communitys = await GetCommunitysService.community_dal.getCommunitysBy({token: filter.token})
        return communitys
    })}
    
}