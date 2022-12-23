import { Router } from "express";
import { AuthController } from "../controllers/auth_controller"

const auth_controller: AuthController = new AuthController()
const router:Router  = Router()

router.get('/one-tap/callback', auth_controller.passport_authenticate, auth_controller.post_succseful_authentication);

export {router as auth_router}

