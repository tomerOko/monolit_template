import { Request, Response, Router } from "express"
import { wrap, wrapSync } from "../../../utilities/function_wrapping"
import { CreatePostService } from "../logic/services/create_post"
import { DeletePostsService } from "../logic/services/delete_posts"
import { GetPostsService } from "../logic/services/get_posts"
import { UpdatePostChangeblePropertiesService } from "../logic/services/update_post_changable_properties"
import { ChangePostRoleRequest, ChangePostRoleResponse, CreateSinglePostRespose, CreatePostRequest, DeleteSinglePostResponse, deletePostByIdRequest, GetSinglePostResponse, getPostByIdRequest, UpdateSinglePostResponse, UpdatePostChangablePropertiesRequest, Post } from "../types/posts_types"

type This = InstanceType<typeof PostController>

export class PostController {
    
    constructor(
        private create_post_service = new CreatePostService(),
        private get_posts_service = new GetPostsService(),
        private update_post_changeble_properties_service = new UpdatePostChangeblePropertiesService(),
        private delete_posts_service = new DeletePostsService()
    ){}


    public createPost = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createPost']>({name: 'PostController/createPost'}, async() =>{    
        const create_post_request:CreatePostRequest = req.body
        try {
            const post = await this.create_post_service.createPost(create_post_request)
            const respose_data: CreateSinglePostRespose = { created: post }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public getPostById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getPostById']>({name: 'PostController/getPostById'}, async() =>{
        const get_post_by_id_requst = req.params as getPostByIdRequest
        try {
            const post = await this.get_posts_service.getSinglePostById(get_post_by_id_requst)
            const respose_data: GetSinglePostResponse={post}
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}
    

    public async updatePostChangableProperties(req: Request, res: Response):Promise<void>{
    return await wrap<This['updatePostChangableProperties']>({name: 'PostController/updatePostChangableProperties'}, async() =>{ 
        const update_post_changable_properties_request:UpdatePostChangablePropertiesRequest = {params: req.params as {post_id: string}, body: req.body }
        try {
            await this.update_post_changeble_properties_service.UpdatePostChangebleProperties(update_post_changable_properties_request)
            const post = await this.get_posts_service.getSinglePostById({post_id:update_post_changable_properties_request.params.post_id})
            const respose_data: UpdateSinglePostResponse ={ updated_post: post }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async deletePostById(req: Request, res: Response):Promise<void>{
    return await wrap<This['deletePostById']>({name: 'PostController/deletePostById'}, async() =>{ 
        const delete_post_request = req.params as deletePostByIdRequest
        try {
            const post = await this.get_posts_service.getSinglePostById({post_id: delete_post_request.post_id})
            await this.delete_posts_service.DeleteSinglePostById(delete_post_request)
            const respose_data: DeleteSinglePostResponse = { deleted_post: post }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async changePostRole(req: Request, res: Response):Promise<void>{
    return await wrap<This['updatePostChangableProperties']>({name: 'PostController/updatePostChangableProperties'}, async() =>{ 
        const update_post_changable_properties_request:ChangePostRoleRequest = {params: req.params as {post_id: string}, body: req.body }
        try {
            await this.update_post_changeble_properties_service.UpdatePostChangebleProperties(update_post_changable_properties_request)
            const post = await this.get_posts_service.getSinglePostById({post_id:update_post_changable_properties_request.params.post_id})
            const respose_data: ChangePostRoleResponse ={ updated_post: post }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}

}
