import { Router } from "express";
import { community_router } from "./services/communities/router/community_rounter";
import { post_router } from "./services/posts/router/posts_rounter";
import { user_router } from "./services/users/router/user_rounter";

const rootRouter = Router()

rootRouter.use('/user',user_router)
rootRouter.use('/post',post_router)
rootRouter.use('/community',community_router)

export {rootRouter}