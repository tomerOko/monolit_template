import { Request, Response, Router } from "express";
import { private_routes } from "../../../middleware/custom/auth";
import {UserController} from "../controllers/users_controller"

const router:Router = Router()
const user_controller = new UserController()

router.post('/createUser',private_routes,user_controller.createUser)

router.get('/getUserById',user_controller.getUserById)

router.get('/getAllUser', user_controller.getAllUser)

router.post('/updateUser',user_controller.updateUser)

router.delete('/deleteUserById',user_controller.deleteUserById)


export {router as userRoutes}

