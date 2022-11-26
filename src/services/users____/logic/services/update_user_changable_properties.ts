
import { wrap } from "../../../../utilities/function_wrapping";
import { User, UserChangableProperties } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof UpdateUserChangebleProperties>

export class UpdateUserChangebleProperties extends UserLogic {

    constructor() {super()}

    //מקבל את
    public UpdateUserChangebleProperties = async (user: UserChangableProperties ):Promise<void> => {
    await wrap<This["UpdateUserChangebleProperties"]>({name:"UpdateUserChangebleProperties/UpdateUserChangebleProperties"}, async()=>{
        if(user.email) await UserUtils.validateMailNotExist(user.email)
        const query_result = await UpdateUserChangebleProperties.user_dal.createUser(user)
    })}

}

