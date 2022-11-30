
import { wrap } from "../../../../utilities/function_wrapping";
import { Community, CommunityFilter } from "../../types/communitys_types";
import { CommunityLogic } from "../base_communitys_logic_class";

type This = InstanceType<typeof DeleteCommunity>

export class DeleteCommunity extends CommunityLogic {

    constructor() {super()}

    public deleteCommunityById = async (community_filter: CommunityFilter):Promise<void> => {
    await wrap<This["deleteCommunityById"]>({name:"DeleteCommunity/deleteCommunity"}, async()=>{
        const query_result = await DeleteCommunity.community_dal.deleteCommunitys(community)
    })}


}
