import { Router } from "express";
import { user_router } from "./services/users/router/user_rounter";

const rootRouter = Router()

rootRouter.use('/users',user_router)

export {rootRouter}