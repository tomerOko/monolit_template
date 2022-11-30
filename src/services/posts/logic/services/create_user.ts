
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { CreatePostRequest, roles, Post } from "../../types/posts_types";
import { PostUtils } from "../../utilities/posts_utils";
import { PostLogic } from "../base_posts_logic_class";
import {v4 as genereateID,} from 'uuid'


type This = InstanceType<typeof CreatePostService>

export class CreatePostService extends PostLogic {

    constructor() {super()}

    public createPost = async (create_post_params:  CreatePostRequest):Promise<Post> => {
    return await wrap<This["createPost"]>({name:"CreatePostService/createPost"}, async()=>{
        if(create_post_params.email) await PostUtils.validateMailNotExist(create_post_params.email)
        const post = this.buildPostObjectBeforeCreate(create_post_params)
        await CreatePostService.post_dal.createPost(post)
        return post
    })}

    private buildPostObjectBeforeCreate(req_body: CreatePostRequest): Post {
    return wrapSync<This["buildPostObjectBeforeCreate"]>({name:"CreatePostService/buildPostObjectBeforeCreate"},()=>{
        const post_object: Post = {
            token: genereateID(),
            communities: [],
            country: req_body.country,
            name: req_body.name,
            email: req_body.email,
            image: req_body.image as URL | undefined,
            role: req_body.role ? req_body.role : roles.basic,
            created_at: new Date(),
            updated_at: new Date()
        }
        return post_object
    })}

}

