import { Request, Response, Router } from "express"
import {v4 as genereateID,} from 'uuid'
import { wrap } from "../../../utilities/function_wrapping"
import { Role, roles } from "../../users____/types/users_types"
import { PostService } from "../logic/services/posts_service"
import { SinglePostRespose, Post, PostIdFilter, post_statuses } from "../types/posts_types"

type This = InstanceType<typeof PostController>

export class PostController {
    
    constructor(private post_serivce = new PostService()){}

    public createPost = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createPost']>({name: 'PostController/createPost'}, async() =>{
        let respose_data: SinglePostRespose
        try {
            const now = new Date()
            const post:Post={
                token: genereateID(),
                author: req.body.author,
                body: req.body.body,
                community: req.body.community,
                date_created: now,
                date_updated: now,
                date_verified: null,
                likes: 0,
                likes_from: [],
                status: post_statuses.pending_approval,
                summary: req.body.summary,
                title: req.body.title
            }
            await this.post_serivce.createPost(post)
            respose_data={post}
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
    })
}



    public getPostById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getPostById']>({name: 'PostController/getPostById'}, async() =>{
        let respose_data: SinglePostRespose
        try {
            const post_id_filter:PostIdFilter={
                token: req.params.post_id
            }
            const post = await this.post_serivce.getPostById(post_id_filter)
            respose_data={post}
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
    })}
   
    //clean this function code
    public validateModerator = async (role: Role, user_token: string) => {
        if (role == roles.basic) {
            throw new Error("not a moderator");
        }
        const user = await this.getPostById
    }


}


// router.post('/createPost',validate(create_post_schema),post_controller.createPost)
// router.get('/getPostById/:post_id',post_controller.getPostById)
// router.get('/getAllPost', post_controller.getAllPost)
// router.post('/updatePost',post_controller.updatePost)
// router.delete('/deletePostById',post_controller.deletePostById)