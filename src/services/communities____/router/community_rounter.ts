import { Router } from "express";
import { user_authentication } from "../../../middleware/custom/authentication";
import { validate_moderator } from "../../../middleware/custom/authorization";
import { validate } from "../../../middleware/packages/zod";
import {CommunityController} from "../controllers/community_controller"
import { create_community_schema, update_community_schema } from "../validations/community_validations";

const community_controller: CommunityController = new CommunityController()
const router:Router  = Router()

router.use(user_authentication)

// classic CRUDS

router.post('/createCommunity',user_authentication,validate_moderator,validate(create_community_schema),community_controller.createCommunity)
router.get('/getCommunityById/:community_id',community_controller.getCommunityById)
router.post('/updateCommunityChangableProperties',validate(update_community_schema),community_controller.updateCommunityChangableProperties)
router.delete('/deleteCommunityById',community_controller.deleteCommunityById)


// specific flows (mostly updates)
router.get('/getAllCommunities', community_controller.getAllCommunities)
router.get('/getCommunitiesPosts', community_controller.getAllCommunities)
router.post('/addUserToCommunity',validate(create_community_schema),community_controller.addUserToCommunity)
router.post('/removeUserFromCommunity',validate(create_community_schema),community_controller.removeUserFromCommunity)




export {router as community_router}

