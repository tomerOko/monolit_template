import { create_error } from "../../../errors/error_factory";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CommunityDAL } from "../dal/communities_dal";

type This = typeof CommunityUtils
export class CommunityUtils {

    static community_dal = new CommunityDAL()

    public static validateMailNotExist = async (email: string):Promise<void> => {
    return await wrap<This["validateMailNotExist"]>({name:"CommunityUtils/validateMailNotExist"}, async()=>{
        const email_exist = await this.community_dal.getCommunitiesBy({email})
        if (email_exist) throw create_error("email allready exist error");
    })}

}