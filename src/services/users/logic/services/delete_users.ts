
import { wrap } from "../../../../utilities/function_wrapping";
import { deleteUserByIdRequest, getUserByIdRequest, User, UserFilter, UserIDFilter } from "../../types/users_types";
import { UserService } from "../base_users_service_class";

type This = InstanceType<typeof DeleteUsersService>

export class DeleteUsersService extends UserService {

    constructor() {super()}

    public DeleteSingleUserById = async (delete_user_by_id_requst: deleteUserByIdRequest):Promise<void> => {
    return await wrap<This["DeleteSingleUserById"]>({name:"DeleteUsersService/DeleteSingleUserById"}, async()=>{
        const user_id = delete_user_by_id_requst.user_id
        const user_id_filter: UserIDFilter = {token: user_id}
        await UserService.user_dal.deleteSinlgeUserByID(user_id_filter)
    })}
    
}