
import { wrap } from "../../../../utilities/function_wrapping";
import { deleteUserByIdRequest, getUserByIdRequest, User, UserFilter } from "../../types/users_types";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof DeleteUsersService>

export class DeleteUsersService extends UserLogic {

    constructor() {super()}

    public DeleteSingleUserById = async (delete_user_by_id_requst: deleteUserByIdRequest):Promise<void> => {
    return await wrap<This["DeleteSingleUserById"]>({name:"DeleteUsersService/DeleteSingleUserById"}, async()=>{
        const user_id = delete_user_by_id_requst.user_id
        await DeleteUsersService.user_dal.deleteSinlgeUserByID({token: user_id})
    })}
    
}