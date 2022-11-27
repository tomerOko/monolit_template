import { create_error } from "../../../errors/error_factory";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { UserDAL } from "../dal/users_dal";

type This = typeof UserUtils
export class UserUtils {

    static user_dal = new UserDAL()

    public static validateMailNotExist = async (email: string):Promise<void> => {
    return await wrap<This["validateMailNotExist"]>({name:"UserUtils/validateMailNotExist"}, async()=>{
        const email_exist = await this.user_dal.getSinlgeUserBy({email})
        if (email_exist) throw create_error("email allready exist error");
    })}

}