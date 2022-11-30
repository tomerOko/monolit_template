
import { wrap } from "../../../../utilities/function_wrapping";
import { deleteCommunityByIdRequest, getCommunityByIdRequest, Community, CommunityFilter } from "../../types/communitys_types";
import { CommunityLogic } from "../base_communitys_logic_class";

type This = InstanceType<typeof DeleteCommunitysService>

export class DeleteCommunitysService extends CommunityLogic {

    constructor() {super()}

    public DeleteSingleCommunityById = async (delete_community_by_id_requst: deleteCommunityByIdRequest):Promise<void> => {
    return await wrap<This["DeleteSingleCommunityById"]>({name:"DeleteCommunitysService/DeleteSingleCommunityById"}, async()=>{
        const community_id = delete_community_by_id_requst.community_id
        await DeleteCommunitysService.community_dal.deleteSinlgeCommunityByID({token: community_id})
    })}
    
}