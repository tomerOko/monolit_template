
import { wrap } from "../../../../utilities/function_wrapping";
import { User } from "../../types/users_types";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof DeleteUser>

export class DeleteUser extends UserLogic {

    constructor() {super()}

    public deleteUser = async (user: User):Promise<void> => {
    await wrap<This["deleteUser"]>({name:"DeleteUser/deleteUser"}, async()=>{
        const query_result = await DeleteUser.user_dal.createUser(user)
    })}


}
