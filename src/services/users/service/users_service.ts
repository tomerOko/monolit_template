import { wrap } from "../../../utilities/function_wrapping";
import { CreateManyResult, ReadResult } from "../../../utilities/mongo_generic_queris";
import { UserDAL } from "../dal/users_dal";
import { User, UserIdFilter } from "../types/users_types";

type This = InstanceType<typeof UserService>

export class UserService {

    constructor( private user_dal: UserDAL = new UserDAL()) {}

    public createUser = async (user: User):Promise<void> => {
    return await wrap<This["createUser"]>({name:"UserService/createUser"}, async()=>{
        if(user.email) await this.validateMailNotExist(user.email)
        const query_result = await this.user_dal.createUser(user)
    })}


    public validateMailNotExist = async (email: string):Promise<void> => {
    return await wrap<This["validateMailNotExist"]>({name:"UserService/validateMailNotExist"}, async()=>{
        const email_exist = await this.user_dal.getUserBy({email})
        if (email_exist.length>0) {
            throw new Error("email allready exist in the system");
        }
    })}

    public getUserById = async (filter: UserIdFilter):Promise<User> => {
    return await wrap<This["getUserById"]>({name:"UserService/createUser"}, async()=>{
        const user = await this.user_dal.getUserBy({token: filter.token})
        if (user.length == 0) throw new Error("user wasnt found");
        if (user.length>1) throw new Error("more then one user found with the same id");
        return user[0]
    })}





    
}