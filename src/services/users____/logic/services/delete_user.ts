
import { wrap } from "../../../../utilities/function_wrapping";
import { User, UserFilter } from "../../types/users_types";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof DeleteUser>

export class DeleteUser extends UserLogic {

    constructor() {super()}

    public deleteUserById = async (user_filter: UserFilter):Promise<void> => {
    await wrap<This["deleteUser"]>({name:"DeleteUser/deleteUser"}, async()=>{
        const query_result = await DeleteUser.user_dal.createUser(user)
    })}


}
