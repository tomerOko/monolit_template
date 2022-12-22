import { create_error } from "../../../errors/error_factory";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { AuthDAL } from "../dal/auths_dal";

export class AuthUtils {

    static auth_dal = new AuthDAL()


}