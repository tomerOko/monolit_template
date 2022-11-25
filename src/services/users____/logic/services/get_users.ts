
import { wrap } from "../../../../utilities/function_wrapping";
import { User, UserFilter } from "../../types/users_types";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof GetUsers>

export class GetUsers extends UserLogic {

    constructor() {super()}

    public getSingleUserById = async (user_id: string):Promise<User> => {
    return await wrap<This["getSingleUserById"]>({name:"GetUsers/getSingleUserById"}, async()=>{
        const user = await GetUsers.user_dal.getSinlgeUserBy({token: user_id})
        if (!user) throw new Error(`user with token:${user_id} does not exist`);
        return user
    })}

    public getUsersBy = async (filter: UserFilter ):Promise<Array<User>> => {
    return await wrap<This["getUsersBy"]>({name:"GetUsers/getUsersBy"}, async()=>{
        const users = await GetUsers.user_dal.getUsersBy({token: filter.token})
        return users
    })}


    





    
}