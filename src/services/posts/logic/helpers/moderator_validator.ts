import { create_error } from "../../../../errors/error_factory"
import { wrap } from "../../../../utilities/function_wrapping"
import { Role, roles, PostFilterByID } from "../../types/posts_types"
import { PostLogic } from "../base_posts_logic_class"


export class PostRoleValidator extends PostLogic {
    
    constructor(){super()}

    public validate_moderator = async (post_toke: string): Promise<void>=> {
    return await wrap({name:'PostRoleValidator/validate_moderator'}, async () => {

        const post_filter: PostFilterByID = {token: post_toke}
        const post = await PostRoleValidator.post_dal.getSinlgePostByID(post_filter)
        const post_role = post.role
        const moderator_roles = [roles.moderator, roles.basic] as Role[]
        if (!moderator_roles.includes(post_role)) throw create_error("not moderator error")
        
    })}
  
    
    public validate_post_role = async (post_toke: string, specific_moderator_type:Role): Promise<void>=> {
    return await wrap({name:'PostRoleValidator/validate_post_role'}, async () => {

        const post_filter: PostFilterByID = {token: post_toke}
        const post = await PostRoleValidator.post_dal.getSinlgePostByID(post_filter)
        const post_role = post.role
        if(post_role!==specific_moderator_type) throw create_error("post role not allowed error")

    })}

}



