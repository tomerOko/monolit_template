import { Router } from "express";
import { admin_authentication, user_authentication } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {PostController} from "../controllers/posts_controller"
import { create_post_schema } from "../validations/posts_validations";

const post_controller: PostController = new PostController()
const router:Router  = Router()

router.use(user_authentication)

// classic CRUDS
router.post('/createPost',validate(create_post_schema),post_controller.createPost)
router.get('/getPostById/:post_id',post_controller.getPostById)
router.post('/updatePostChangableProperties',post_controller.updatePost)
router.delete('/deletePostById',post_controller.deletePostById)


// specific flows (mostly updates)

router.post('/changeCommunityOfPost', post_controller.changeCommunityOfPost)
router.post('/approveOrRejectPost', admin_authentication, post_controller.approveOrRejectPost)
//get relevant posts to user (FEED ) meybe another service?




export {router as post_router}

