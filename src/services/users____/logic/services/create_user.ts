
import { wrap } from "../../../../utilities/function_wrapping";
import { User } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof CreateUser>

export class CreateUser extends UserLogic {

    constructor() {super()}

    public createUser = async (user: User):Promise<void> => {
    await wrap<This["createUser"]>({name:"CreateUser/createUser"}, async()=>{
        if(user.email) await UserUtils.validateMailNotExist(user.email)
        const query_result = await CreateUser.user_dal.createUser(user)
    })}

}
