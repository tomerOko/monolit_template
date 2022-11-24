import { wrap } from "../../../utilities/function_wrapping";
import { CreateManyResult, ReadResult } from "../../../utilities/mongo_generic_queris";
import { PostDAL } from "../dal/posts_dal";
import { Post, PostIdFilter } from "../types/posts_types";
import { PostUtils } from "../utilities/posts_utils";

type This = InstanceType<typeof PostService>

export class PostService {

    constructor( private post_dal: PostDAL = new PostDAL()) {}

    public createPost = async (post: Post):Promise<void> => {
    return await wrap<This["createPost"]>({name:"PostService/createPost"}, async()=>{
        PostUtils.generatePostSummaryIfMissing(post)
        const query_result = await this.post_dal.createPost(post)
    })}

    public getPostById = async (filter: PostIdFilter):Promise<Post> => {
    return await wrap<This["getPostById"]>({name:"PostService/createPost"}, async()=>{
        const post = await this.post_dal.getPostBy({token: filter.token})
        if (post.length == 0) throw new Error("post wasnt found");
        if (post.length>1) throw new Error("more then one post found with the same id");
        return post[0]
    })}

}