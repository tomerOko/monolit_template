import { Router } from "express";
import {AuthController} from "../controllers/auth_controller"

const auth_controller: AuthController = new AuthController()
const router:Router  = Router()

router.get('/auth/google', auth_controller.google);
  
router.get('/auth/google/callback', auth_controller.google_callback, auth_controller.after_google_callbeack)
  

export {router as auth_router}

