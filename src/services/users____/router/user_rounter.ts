import { Router } from "express";
import { user_authentication } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {UserController} from "../controllers/users_controller"
import { create_user_schema, get_user_by_id_schema, update_user_changable_properties_schema } from "../validations/users_validations";

const user_controller: UserController = new UserController()
const router:Router  = Router()

router.use(user_authentication)

// classic CRUDS
router.post('/createUser',validate(create_user_schema),user_controller.createUser) //todo: add error handling.  //todo: chack that it is working   //todo: add to one of the integration test flows
router.get('/getUserById/:user_id',validate(get_user_by_id_schema),user_controller.getUserById)
router.post('/updateUserChangableProperties',validate(update_user_changable_properties_schema), user_controller.updateUserChangableProperties)
router.delete('/deleteUserById',validate(create_user_schema), user_controller.deleteUserById)

// specific flows (mostly updates)
router.post('/changeUserRole',user_controller.changeUserRole)
router.post('/addUserToComunity',user_controller.addUserToComunity)




export {router as user_router}

