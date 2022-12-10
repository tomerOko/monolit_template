
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { UpdateUserChangablePropertiesRequest, User, UserChangeableProperties, UserIDFilter } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserService } from "../base_users_service_class";

export class UpdateUserChangeblePropertiesService extends UserService {

    constructor() {super()}

    public UpdateUserChangebleProperties = async (update_user_changable_properties_request: UpdateUserChangablePropertiesRequest ):Promise<void> => {
    await wrap({name:"UpdateUserChangeblePropertiesService/UpdateUserChangebleProperties"}, async()=>{
        const { user_changeable_params, user_id_filter, user_update_properties }= this.parseParams(update_user_changable_properties_request);
        await this.verifiyEmailIfNeeded(user_changeable_params)
        await UserService.user_dal.UpdateSingleUserbByID(user_id_filter, user_update_properties)
    })}


    private verifiyEmailIfNeeded = async (user_changeable_params: UpdateUserChangablePropertiesRequest["body"]):Promise<void> => {
    await wrap({name:"UpdateUserChangeblePropertiesService/verifiyEmailIfNeeded"}, async()=>{
        
        const new_user_email = user_changeable_params.email;
        if (new_user_email)
            await UserUtils.validateMailNotExist(new_user_email);

    })}


    private parseParams(update_user_changable_properties_request: UpdateUserChangablePropertiesRequest): { user_changeable_params: UpdateUserChangablePropertiesRequest["body"], user_id_filter: UserIDFilter, user_update_properties: Partial<User>} {
    return wrapSync({name:"UpdateUserChangeblePropertiesService/parseParams"}, ()=>{
        
        const user_id = update_user_changable_properties_request.params.user_id;
        const user_id_filter: UserIDFilter = { token: user_id };
        const user_changeable_params = update_user_changable_properties_request.body;
        const user_update_properties: Partial<User> = this.parseChangeableProprtiesToUpdateQueryData(user_changeable_params);
        return { user_changeable_params, user_id_filter, user_update_properties };

    })}

    private parseChangeableProprtiesToUpdateQueryData(user_changeable_params: UserChangeableProperties): Partial<User>{
    return wrapSync({name: "UpdateUserChangeblePropertiesService/parseChangeableProprtiesToUpdateQueryData"},()=>{
        
        const user_update_properties: Partial<User> = { updated_at: new Date() };
        for (const [key, value] of Object.entries((user_changeable_params))) {
            if (value)
                user_update_properties[key] = value;
        }
        return user_update_properties;

    })}

}