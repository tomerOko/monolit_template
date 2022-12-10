
import { wrap } from "../../../../utilities/function_wrapping";
import { getUserByIdRequest, User, UserFilter } from "../../types/users_types";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof GetUsersService>

export class GetUsersService extends UserLogic {

    constructor() {super()}

    public getSingleUserById = async (get_user_by_id_requst: getUserByIdRequest):Promise<User> => {
    return await wrap<This["getSingleUserById"]>({name:"GetUsersService/getSingleUserById"}, async()=>{
        const user_id = get_user_by_id_requst.user_id
        const user = await UserLogic.user_dal.getSinlgeUserByID(user_id)
        return user
    })}

    public getUsersBy = async (filter: UserFilter ):Promise<Array<User>> => {
    return await wrap<This["getUsersBy"]>({name:"GetUsersService/getUsersBy"}, async()=>{
        const users = await UserLogic.user_dal.getUsersBy(filter)
        return users
    })}
    
}