
import { wrap } from "../../../../utilities/function_wrapping";
import { User } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UpdateUserChangablePropertiesRequest } from "../../validations/users_validations";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof UpdateUserChangebleProperties>

export class UpdateUserChangebleProperties extends UserLogic {

    constructor() {super()}

    public UpdateUserChangebleProperties = async (user: UpdateUserChangablePropertiesRequest["body"]):Promise<void> => {
    await wrap<This["UpdateUserChangebleProperties"]>({name:"UpdateUserChangebleProperties/UpdateUserChangebleProperties"}, async()=>{
        if(user.email) await UserUtils.validateMailNotExist(user.email)
        const query_result = await CreateUser.user_dal.createUser(user)
    })}

}

