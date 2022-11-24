import { Router } from "express";
import { user_authentication } from "../../../middleware/custom/auth";
import { validate } from "../../../middleware/packages/zod";
import {CommunityController} from "../controllers/community_controller"
import { create_community_schema, update_community_schema } from "../validations/community_validations";

const community_controller: CommunityController = new CommunityController()
const router:Router  = Router()

router.use(user_authentication)

router.post('/createCommunity',validate(create_community_schema),community_controller.createCommunity)
router.get('/getCommunityById/:community_id',community_controller.getCommunityById)
router.get('/getAllCommunity', community_controller.getAllCommunity)
router.post('/updateCommunity',validate(update_community_schema),community_controller.updateCommunity)
router.delete('/deleteCommunityById',community_controller.deleteCommunityById)


export {router as community_router}

