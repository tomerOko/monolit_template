
import { wrap } from "../../../../utilities/function_wrapping";
import { User } from "../../types/users_types";
import { UserLogic } from "../base_users_logic_class";

type This = InstanceType<typeof CreateUser>

export class CreateUser extends UserLogic {

    constructor() {super()}

    public createUser = async (user: User):Promise<void> => {
    await wrap<This["createUser"]>({name:"CreateUser/createUser"}, async()=>{
        if(user.email) await this.validateMailNotExist(user.email)
        const query_result = await CreateUser.user_dal.createUser(user)
    })}

    public validateMailNotExist = async (email: string):Promise<void> => {
    return await wrap<This["validateMailNotExist"]>({name:"UserService/validateMailNotExist"}, async()=>{
        const email_exist = await CreateUser.user_dal.getSinlgeUserBy({email})
        if (email_exist) throw new Error("email allready exist in the system");
    })}
}

