
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { ChangePostRoleRequest, roles, Post } from "../../types/posts_types";
import { PostUtils } from "../../utilities/posts_utils";
import { PostLogic } from "../base_posts_logic_class";

type This = InstanceType<typeof ChangePostRoleService>

export class ChangePostRoleService extends PostLogic {

    constructor() {super()}

    public changePostRole = async (change_post_role_request:ChangePostRoleRequest):Promise<void> => {
    await wrap({name:"ChangePostRoleService/changePostRole"}, async()=>{
        
        await this.validate_super_moderator(change_post_role_request);
        await this.paraseParamsAndCallDAL(change_post_role_request);

    })}

    private async paraseParamsAndCallDAL(change_post_role_request: ChangePostRoleRequest) {
    await wrap({name:"ChangePostRoleService/paraseParamsAndCallDAL"}, async()=>{

        const id_of_post_to_update = change_post_role_request.body.post_to_update;
        const new_role = change_post_role_request.body.role;
        const post_update_properties: Partial<Post> = { role: new_role };
        await ChangePostRoleService.post_dal.UpdateSinglePostbByID(id_of_post_to_update, post_update_properties);

    })}


    private async validate_super_moderator(change_post_role_request: ChangePostRoleRequest) {
    await wrap({name:"ChangePostRoleService/validate_super_moderator"}, async()=>{
        const responsible_moderator_id = change_post_role_request.params.authorized_moderator_id;
        await ChangePostRoleService.post_helper.post_role_validator.validate_post_role(responsible_moderator_id, roles.super_moderator);
    })}

}