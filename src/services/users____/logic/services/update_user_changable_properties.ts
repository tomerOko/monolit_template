
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { UpdateUserChangablePropertiesRequest, User, UserChangableProperties } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof UpdateUserChangeblePropertiesService>

export class UpdateUserChangeblePropertiesService extends UserLogic {

    constructor() {super()}

    public UpdateUserChangebleProperties = async (update_user_changable_properties_request:UpdateUserChangablePropertiesRequest ):Promise<void> => {
    await wrap<This["UpdateUserChangebleProperties"]>({name:"UpdateUserChangeblePropertiesService/UpdateUserChangebleProperties"}, async()=>{
        
        const { user_ID, user_update_properties }: { user_ID: string; user_update_properties: Partial<User>; } = await this.parseParamsAndVerifiyEmailIfNeeded(update_user_changable_properties_request);
        await UpdateUserChangeblePropertiesService.user_dal.UpdateSingleUserbByID(user_ID, user_update_properties)

    })}


    private parseParamsAndVerifiyEmailIfNeeded = async (update_user_changable_properties_request: UpdateUserChangablePropertiesRequest) => {
    return await wrap({name:"UpdateUserChangeblePropertiesService/parseParamsAndVerifiyEmailIfNeeded"}, async()=>{
        
        const new_user_email = update_user_changable_properties_request.body.email;
        if (new_user_email)
            await UserUtils.validateMailNotExist(new_user_email);
        const user_update_properties: Partial<User> = this.parseChangeableProprtiesToUpdateProperties(update_user_changable_properties_request);
        const user_ID = update_user_changable_properties_request.params.user_id;
        return { user_ID, user_update_properties };

    })}


    private parseChangeableProprtiesToUpdateProperties(update_user_changable_properties_request: UpdateUserChangablePropertiesRequest) {
    return wrapSync({name: "UpdateUserChangeblePropertiesService/parseCangeableProprtiesToUpdateProperties"},()=>{
        
        const user_update_properties: Partial<User> = { updated_at: new Date() };
        for (const [key, value] of Object.entries(update_user_changable_properties_request.body)) {
            if (value)
                user_update_properties[key] = value;
        }
        return user_update_properties;

    })}

}