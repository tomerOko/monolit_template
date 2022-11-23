import { Request, Response, Router } from "express";
import { private_routes } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {UserController} from "../controllers/users_controller"
import { create_user_schema } from "../validations/users_validations";

const router:Router = Router()
const user_controller = new UserController()

router.use(private_routes)

router.post('/createUser',validate(create_user_schema),user_controller.createUser)

router.get('/getUserById',user_controller.getUserById)

router.get('/getAllUser', user_controller.getAllUser)

router.post('/updateUser',user_controller.updateUser)

router.delete('/deleteUserById',user_controller.deleteUserById)


export {router as userRoutes}

