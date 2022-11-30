
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { UpdateUserChangablePropertiesRequest, User, UserChangeableProperties } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof UpdateUserChangeblePropertiesService>

export class UpdateUserChangeblePropertiesService extends UserLogic {

    constructor() {super()}

    public UpdateUserChangebleProperties = async (update_user_changable_properties_request:UpdateUserChangablePropertiesRequest ):Promise<void> => {
    await wrap({name:"UpdateUserChangeblePropertiesService/UpdateUserChangebleProperties"}, async()=>{
        const user_id = update_user_changable_properties_request.params.user_id;
        const user_changeable_params = update_user_changable_properties_request.body
        const user_update_properties:Partial<User> = await this.parseChangeableProprtiesToUpdateProperties(user_changeable_params);
        await UpdateUserChangeblePropertiesService.user_dal.UpdateSingleUserbByID(user_id, user_update_properties)
    })}


    private verifiyEmailIfNeeded = async (user_changeable_params: UpdateUserChangablePropertiesRequest["body"]):Promise<void> => {
    await wrap({name:"UpdateUserChangeblePropertiesService/verifiyEmailIfNeeded"}, async()=>{
        const new_user_email = user_changeable_params.email;
        if (new_user_email)
            await UserUtils.validateMailNotExist(new_user_email);
    })}


    private parseChangeableProprtiesToUpdateProperties(user_changeable_params: UserChangeableProperties): Partial<User>{
    return wrapSync({name: "UpdateUserChangeblePropertiesService/parseCangeableProprtiesToUpdateProperties"},()=>{
        const user_update_properties: Partial<User> = { updated_at: new Date() };
        for (const [key, value] of Object.entries((user_changeable_params))) {
            if (value)
                user_update_properties[key] = value;
        }
        return user_update_properties;
    })}

}