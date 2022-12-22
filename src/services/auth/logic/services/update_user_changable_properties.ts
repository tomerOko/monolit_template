
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { UserService } from "../base_auth_service_class";

export class UpdateUserChangeblePropertiesService extends UserService {

    constructor() {super()}

    // public UpdateUserChangebleProperties = async (update_user_changable_properties_request: UpdateUserChangablePropertiesRequest ):Promise<void> => {
    // await wrap({name:"UpdateUserChangeblePropertiesService/UpdateUserChangebleProperties"}, async()=>{
    //     const { user_changeable_params, user_id_filter, user_update_properties }= this.parseParams(update_user_changable_properties_request);
    //     await this.verifiyEmailIfNeeded(user_changeable_params)
    //     await UserService.user_dal.UpdateSingleUserbByID(user_id_filter, user_update_properties)
    // })}



}