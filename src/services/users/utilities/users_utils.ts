import { create_error } from "../../../errors/error_factory";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { UserDAL } from "../dal/users_dal";

export class UserUtils {

    static user_dal = new UserDAL()

    public static validateMailNotExist = async (email: string):Promise<void> => {
    return await wrap({name:"UserUtils/validateMailNotExist"}, async()=>{
        const email_exist = await this.user_dal.getUsersBy({email})
        if (email_exist) throw create_error("email allready exist error");
    })}

}