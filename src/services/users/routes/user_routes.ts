import { Request, Response, Router } from "express";
import {userControllers} from "../controllers/users_controller"

const router:Router = Router()

router.post('/createUser',userControllers.createUser)

router.post('/retriveUserById',userControllers.retriveUserById)

router.get('/getAllUsers', userControllers.getAllUsers)

router.delete('/deleteUsersById',userControllers.deleteUsersById)

router.post('/setUserStatus',userControllers.setUserStatus)


export {router as userRoutes}

