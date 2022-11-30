import { Community } from "./community_types"
import { User } from "../users/types/users_types"

export const approved = "approved" as const
export const pending_approval = "pending_approval" as const
export const rejected = "rejected" as const 
export type PostStatus = keyof {approved, pending_approval, rejected}
export const post_statuses = {approved, pending_approval, rejected}


/**
 * A post is in pending state until it’s approved by a moderator/super moderator. 
 * approved post becomes publicly open (see Viewing + approving post).
 * the system needs to support tens of thousands of post in the foreseeable future.  
 * post belongs to a certain community  
 */
export type Post = {
    token: string // identifier key
    title: string, // text with up to 60 chars
    summary: string, // text with up to 150 words
    body: string, // text 
    author: User["token"] ,// the author of this post
    community: Community["token"], //the community this post belongs to 
    likes: number, //a number representing the number of likes this post got
    likes_from: User["token"][],
    status: PostStatus 
    date_created: Date,
    date_updated: Date,
    date_verified: Date | null // the date the post been approved / rejected
}


export type UserFeed = {
    token: User["token"], // identifier key
    upadated_at: Date,
    day_paginations: number,
    post:Post[]
}

export type PostFilter = Partial<Post>
export type PostIdFilter = {token: string}

export type SinglePostRespose = {
    post?: Post,
    error?: any
}



/**
 * 
 *    public createPost = async (req: Request, res: Response):Promise<void>=>{
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





router.post('/changeCommunityOfPost', post_controller.changeCommunityOfPost)
router.post('/approveOrRejectPost', admin_authentication, post_controller.approveOrRejectPost)
//get relevant posts to user (FEED ) meybe another service?


 */