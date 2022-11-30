import { Router } from "express";
// import { community_router } from "./services/communities____/router/community_rounter";
// import { post_router } from "./services/posts____/router/posts_rounter";
import { user_router } from "./services/users____/router/user_rounter";

const rootRouter = Router()

rootRouter.use('/user',user_router)
// rootRouter.use('/post',post_router)
// rootRouter.use('/community',community_router)

export {rootRouter}