import { Router } from "express";
import { private_routes } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {UserController} from "../controllers/users_controller"
import { create_user_schema } from "../validations/users_validations";


class UserRouter {
    private router:Router
    public user_controller:UserController = new UserController()

    constructor() {
        this.user_controller = new UserController()
        this.router = Router()
        
        this.router.use(private_routes)
        this.router.post('/createUser',validate(create_user_schema),this.user_controller.createUser)
        this.router.get('/getUserById',this.user_controller.getUserById)
        this.router.get('/getAllUser', this.user_controller.getAllUser)
        this.router.post('/updateUser',this.user_controller.updateUser)
        this.router.delete('/deleteUserById',this.user_controller.deleteUserById)
    }
}




export {UserRouter}

