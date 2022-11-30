import { create_error } from "../../../errors/error_factory";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { PostDAL } from "../dal/posts_dal";

type This = typeof PostUtils
export class PostUtils {

    static post_dal = new PostDAL()

    public static validateMailNotExist = async (email: string):Promise<void> => {
    return await wrap<This["validateMailNotExist"]>({name:"PostUtils/validateMailNotExist"}, async()=>{
        const email_exist = await this.post_dal.getPostsBy({email})
        if (email_exist) throw create_error("email allready exist error");
    })}

}