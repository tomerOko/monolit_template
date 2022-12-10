
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { ChangeUserRoleRequest, roles, User, UserIDFilter, UserUpdateValues } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserService } from "../base_users_service_class";

type This = InstanceType<typeof ChangeUserRoleService>

export class ChangeUserRoleService extends UserService {

    constructor() {super()}

    public changeUserRole = async (change_user_role_request:ChangeUserRoleRequest):Promise<void> => {
    await wrap({name:"ChangeUserRoleService/changeUserRole"}, async()=>{

        await this.validate_super_moderator(change_user_role_request);
        await this.paraseParamsAndCallDAL(change_user_role_request);

    })}

    private async paraseParamsAndCallDAL(change_user_role_request: ChangeUserRoleRequest) {
    await wrap({name:"ChangeUserRoleService/paraseParamsAndCallDAL"}, async()=>{

        const { user_id_filter, user_update_properties } = this.parseParams(change_user_role_request);
        await UserService.user_dal.UpdateSingleUserbByID(user_id_filter, user_update_properties);

    })}


    private parseParams(change_user_role_request:ChangeUserRoleRequest): { user_id_filter: UserIDFilter, user_update_properties: Partial<User>} {
    return wrapSync({name:"ChangeUserRoleService/parseParams"}, ()=>{

            const id_of_user_to_update = change_user_role_request.body.user_id;
            const user_id_filter: UserIDFilter = { token: id_of_user_to_update };
            const new_role = change_user_role_request.body.role;
            const user_update_properties: UserUpdateValues = { role: new_role };
            return { user_id_filter, user_update_properties };

    })}

    private async validate_super_moderator(change_user_role_request: ChangeUserRoleRequest) {
    await wrap({name:"ChangeUserRoleService/validate_super_moderator"}, async()=>{

        const responsible_moderator_id = change_user_role_request.params.authorized_moderator_id;
        const user_id_filter: UserIDFilter = {token: responsible_moderator_id}
        await UserService.user_helper.user_role_validator.validate_super_moderator(user_id_filter);

    })}

}