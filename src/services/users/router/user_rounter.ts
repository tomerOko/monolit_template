import { Router } from "express";
import { user_authentication } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {UserController} from "../controllers/users_controller"
import { create_user_schema } from "../validations/users_validations";

const user_controller: UserController = new UserController()
const router:Router  = Router()

router.use(user_authentication)

router.post('/createUser',validate(create_user_schema),user_controller.createUser)
router.get('/getUserById/:user_id',user_controller.getUserById)
router.get('/getAllUser', user_controller.getAllUser)
router.post('/updateUser',user_controller.updateUser)
router.delete('/deleteUserById',user_controller.deleteUserById)


export {router as user_router}

