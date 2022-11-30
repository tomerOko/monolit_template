
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { ChangeUserRoleRequest, roles, User } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof ChangeUserRoleService>

export class ChangeUserRoleService extends UserLogic {

    constructor() {super()}

    public changeUserRole = async (change_user_role_request:ChangeUserRoleRequest):Promise<void> => {
    await wrap({name:"ChangeUserRoleService/changeUserRole"}, async()=>{
        
        await this.validate_super_moderator(change_user_role_request);
        await this.paraseParamsAndCallDAL(change_user_role_request);

    })}

    private async paraseParamsAndCallDAL(change_user_role_request: ChangeUserRoleRequest) {
    await wrap({name:"ChangeUserRoleService/paraseParamsAndCallDAL"}, async()=>{

        const id_of_user_to_update = change_user_role_request.body.user_to_update;
        const new_role = change_user_role_request.body.role;
        const user_update_properties: Partial<User> = { role: new_role };
        await ChangeUserRoleService.user_dal.UpdateSingleUserbByID(id_of_user_to_update, user_update_properties);

    })}


    private async validate_super_moderator(change_user_role_request: ChangeUserRoleRequest) {
    await wrap({name:"ChangeUserRoleService/validate_super_moderator"}, async()=>{
        const responsible_moderator_id = change_user_role_request.params.authorized_moderator_id;
        await ChangeUserRoleService.user_helper.user_role_validator.validate_user_role(responsible_moderator_id, roles.super_moderator);
    })}

}