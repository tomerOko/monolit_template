import { Router } from "express";
import { user_authentication } from "../../../middleware/custom/authentication";
import { validate } from "../../../middleware/packages/zod";
import {UserController} from "../controllers/users_controller"
import { create_user_schema, delete_user_by_id_schema, get_user_by_id_schema, update_user_changable_properties_schema } from "../validations/users_validations";

const user_controller: UserController = new UserController()
const router:Router  = Router()

router.use(user_authentication)

//TODO: chack all routes are working   //TODO: use each of the routes in at least integration tests


// classic CRUDS 
router.post('/createUser',validate(create_user_schema),user_controller.createUser)  
router.get('/getUserById/:user_id',validate(get_user_by_id_schema),user_controller.getUserById) 
router.post('/updateUserChangableProperties',validate(update_user_changable_properties_schema), user_controller.updateUserChangableProperties) 
router.delete('/deleteUserById',validate(delete_user_by_id_schema), user_controller.deleteUserById)

// specific flows (mostly updates)
router.post('/changeUserRole',user_controller.changeUserRole)




export {router as user_router}

