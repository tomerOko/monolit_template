import { Request, Response, Router } from "express";
import {userControllers} from "../controllers/users_controller"

const router:Router = Router()

router.post('/createUser',userControllers.)

router.post('/getUserById',userControllers.)

router.get('/getAllUser', userControllers.)

router.post('/updateUser',userControllers.)

router.delete('/deleteUserById',userControllers.)


export {router as userRoutes}

