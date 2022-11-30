
import { wrap } from "../../../../utilities/function_wrapping";
import { deletePostByIdRequest, getPostByIdRequest, Post, PostFilter } from "../../types/posts_types";
import { PostLogic } from "../base_posts_logic_class";

type This = InstanceType<typeof DeletePostsService>

export class DeletePostsService extends PostLogic {

    constructor() {super()}

    public DeleteSinglePostById = async (delete_post_by_id_requst: deletePostByIdRequest):Promise<void> => {
    return await wrap<This["DeleteSinglePostById"]>({name:"DeletePostsService/DeleteSinglePostById"}, async()=>{
        const post_id = delete_post_by_id_requst.post_id
        await DeletePostsService.post_dal.deleteSinlgePostByID({token: post_id})
    })}
    
}