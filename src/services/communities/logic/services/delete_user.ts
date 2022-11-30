
import { wrap } from "../../../../utilities/function_wrapping";
import { Community, CommunityFilter } from "../../types/communities_types";
import { CommunityLogic } from "../base_communities_logic_class";

type This = InstanceType<typeof DeleteCommunity>

export class DeleteCommunity extends CommunityLogic {

    constructor() {super()}

    public deleteCommunityById = async (community_filter: CommunityFilter):Promise<void> => {
    await wrap<This["deleteCommunityById"]>({name:"DeleteCommunity/deleteCommunity"}, async()=>{
        const query_result = await DeleteCommunity.community_dal.deleteCommunities(community)
    })}


}
