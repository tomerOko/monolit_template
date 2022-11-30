
import { wrap } from "../../../../utilities/function_wrapping";
import { getPostByIdRequest, Post, PostFilter } from "../../types/posts_types";
import { PostLogic } from "../base_posts_logic_class";

type This = InstanceType<typeof GetPostsService>

export class GetPostsService extends PostLogic {

    constructor() {super()}

    public getSinglePostById = async (get_post_by_id_requst: getPostByIdRequest):Promise<Post> => {
    return await wrap<This["getSinglePostById"]>({name:"GetPostsService/getSinglePostById"}, async()=>{
        const post_id = get_post_by_id_requst.post_id
        const post = await GetPostsService.post_dal.getSinlgePostByID({token: post_id})
        return post
    })}

    public getPostsBy = async (filter: PostFilter ):Promise<Array<Post>> => {
    return await wrap<This["getPostsBy"]>({name:"GetPostsService/getPostsBy"}, async()=>{
        const posts = await GetPostsService.post_dal.getPostsBy({token: filter.token})
        return posts
    })}
    
}