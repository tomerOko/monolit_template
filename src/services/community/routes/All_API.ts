import { Router } from "express";
import { userRoutes } from "./user_routes";

const rootRouter = Router()

rootRouter.use('/users',userRoutes )
export {rootRouter}