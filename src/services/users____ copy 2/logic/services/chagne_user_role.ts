
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { ChangeCommunityRoleRequest, roles, Community } from "../../types/communitys_types";
import { CommunityUtils } from "../../utilities/communitys_utils";
import { CommunityLogic } from "../base_communitys_logic_class";

type This = InstanceType<typeof ChangeCommunityRoleService>

export class ChangeCommunityRoleService extends CommunityLogic {

    constructor() {super()}

    public changeCommunityRole = async (change_community_role_request:ChangeCommunityRoleRequest):Promise<void> => {
    await wrap({name:"ChangeCommunityRoleService/changeCommunityRole"}, async()=>{
        
        await this.validate_super_moderator(change_community_role_request);
        await this.paraseParamsAndCallDAL(change_community_role_request);

    })}

    private async paraseParamsAndCallDAL(change_community_role_request: ChangeCommunityRoleRequest) {
    await wrap({name:"ChangeCommunityRoleService/paraseParamsAndCallDAL"}, async()=>{

        const id_of_community_to_update = change_community_role_request.body.community_to_update;
        const new_role = change_community_role_request.body.role;
        const community_update_properties: Partial<Community> = { role: new_role };
        await ChangeCommunityRoleService.community_dal.UpdateSingleCommunitybByID(id_of_community_to_update, community_update_properties);

    })}


    private async validate_super_moderator(change_community_role_request: ChangeCommunityRoleRequest) {
    await wrap({name:"ChangeCommunityRoleService/validate_super_moderator"}, async()=>{
        const responsible_moderator_id = change_community_role_request.params.authorized_moderator_id;
        await ChangeCommunityRoleService.community_helper.community_role_validator.validate_community_role(responsible_moderator_id, roles.super_moderator);
    })}

}