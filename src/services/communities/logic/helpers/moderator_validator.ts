import { create_error } from "../../../../errors/error_factory"
import { wrap } from "../../../../utilities/function_wrapping"
import { Role, roles, CommunityFilterByID } from "../../types/communities_types"
import { CommunityLogic } from "../base_communities_logic_class"


export class CommunityRoleValidator extends CommunityLogic {
    
    constructor(){super()}

    public validate_moderator = async (community_toke: string): Promise<void>=> {
    return await wrap({name:'CommunityRoleValidator/validate_moderator'}, async () => {

        const community_filter: CommunityFilterByID = {token: community_toke}
        const community = await CommunityRoleValidator.community_dal.getSinlgeCommunityByID(community_filter)
        const community_role = community.role
        const moderator_roles = [roles.moderator, roles.basic] as Role[]
        if (!moderator_roles.includes(community_role)) throw create_error("not moderator error")
        
    })}
  
    
    public validate_community_role = async (community_toke: string, specific_moderator_type:Role): Promise<void>=> {
    return await wrap({name:'CommunityRoleValidator/validate_community_role'}, async () => {

        const community_filter: CommunityFilterByID = {token: community_toke}
        const community = await CommunityRoleValidator.community_dal.getSinlgeCommunityByID(community_filter)
        const community_role = community.role
        if(community_role!==specific_moderator_type) throw create_error("community role not allowed error")

    })}

}



