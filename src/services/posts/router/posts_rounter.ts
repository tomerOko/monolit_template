import { Router } from "express";
import { post_authentication } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {PostController} from "../controllers/post_controller"
import { create_post_schema } from "../validations/post_validations";

const post_controller: PostController = new PostController()
const router:Router  = Router()

router.use(post_authentication)

router.post('/createPost',validate(create_post_schema),post_controller.createPost)
router.get('/getPostById/:post_id',post_controller.getPostById)
router.get('/getAllPost', post_controller.getAllPost)
router.post('/updatePost',post_controller.updatePost)
router.delete('/deletePostById',post_controller.deletePostById)


export {router as post_router}

