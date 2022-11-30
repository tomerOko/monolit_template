import { Router } from "express";
import { post_authentication } from "../../../middleware/custom/authentication";
import { validate } from "../../../middleware/packages/zod";
import {PostController} from "../controllers/posts_controller"
import { create_post_schema, delete_post_by_id_schema, get_post_by_id_schema, update_post_changable_properties_schema } from "../validations/posts_validations";

const post_controller: PostController = new PostController()
const router:Router  = Router()

router.use(post_authentication)

//TODO: chack all routes are working   //TODO: use each of the routes in at least integration tests


// classic CRUDS 
router.post('/createPost',validate(create_post_schema),post_controller.createPost)  
router.get('/getPostById/:post_id',validate(get_post_by_id_schema),post_controller.getPostById) 
router.post('/updatePostChangableProperties',validate(update_post_changable_properties_schema), post_controller.updatePostChangableProperties) 
router.delete('/deletePostById',validate(delete_post_by_id_schema), post_controller.deletePostById)

// specific flows (mostly updates)
router.post('/changePostRole',post_controller.changePostRole)




export {router as post_router}

