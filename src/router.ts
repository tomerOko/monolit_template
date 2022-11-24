import { Router } from "express";
import { user_router } from "./services/users/router/user_rounter";

const rootRouter = Router()

rootRouter.use('/user',user_router)
// rootRouter.use('/post',postRoutes)
// rootRouter.use('/community',communityRoutes)

export {rootRouter}