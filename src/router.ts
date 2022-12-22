import { Router } from "express";
import { auth_router } from "./services/auth/router/auth_rounter";
import { user_router } from "./services/users/router/user_rounter";

const rootRouter = Router()

rootRouter.use('/auth',auth_router)
rootRouter.use('/users',user_router)

export {rootRouter}