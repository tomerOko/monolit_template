
import { wrap } from "../../../../utilities/function_wrapping";
import { getUserByIdRequest, User, UserFilter, UserIDFilter } from "../../types/users_types";
import { UserService } from "../base_users_service_class";


export class GetUsersService extends UserService {

    constructor() {super()}

    public getSingleUserById = async (get_user_by_id_requst: getUserByIdRequest):Promise<User> => {
    return await wrap({name:"GetUsersService/getSingleUserById"}, async()=>{
        const user_id = get_user_by_id_requst.user_id
        const user_id_filter: UserIDFilter = {token: user_id}
        const user = await UserService.user_dal.getSinlgeUserByID(user_id_filter)
        return user
    })}

    public getUsersBy = async (filter: UserFilter ):Promise<Array<User>> => {
    return await wrap({name:"GetUsersService/getUsersBy"}, async()=>{
        const users = await UserService.user_dal.getUsersBy(filter)
        return users
    })}
    
}