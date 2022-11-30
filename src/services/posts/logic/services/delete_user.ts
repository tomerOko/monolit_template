
import { wrap } from "../../../../utilities/function_wrapping";
import { Post, PostFilter } from "../../types/posts_types";
import { PostLogic } from "../base_posts_logic_class";

type This = InstanceType<typeof DeletePost>

export class DeletePost extends PostLogic {

    constructor() {super()}

    public deletePostById = async (post_filter: PostFilter):Promise<void> => {
    await wrap<This["deletePostById"]>({name:"DeletePost/deletePost"}, async()=>{
        const query_result = await DeletePost.post_dal.deletePosts(post)
    })}


}
