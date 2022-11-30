
import { wrap } from "../../../../utilities/function_wrapping";
import { deleteCommunityByIdRequest, getCommunityByIdRequest, Community, CommunityFilter } from "../../types/communities_types";
import { CommunityLogic } from "../base_communities_logic_class";

type This = InstanceType<typeof DeleteCommunitiesService>

export class DeleteCommunitiesService extends CommunityLogic {

    constructor() {super()}

    public DeleteSingleCommunityById = async (delete_community_by_id_requst: deleteCommunityByIdRequest):Promise<void> => {
    return await wrap<This["DeleteSingleCommunityById"]>({name:"DeleteCommunitiesService/DeleteSingleCommunityById"}, async()=>{
        const community_id = delete_community_by_id_requst.community_id
        await DeleteCommunitiesService.community_dal.deleteSinlgeCommunityByID({token: community_id})
    })}
    
}