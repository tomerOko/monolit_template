import { Router } from "express";
import { userRoutes } from "./services/users/router/user_rounter";

const rootRouter = Router()

rootRouter.use('/user',userRoutes)
// rootRouter.use('/post',postRoutes)
// rootRouter.use('/community',communityRoutes)

export {rootRouter}