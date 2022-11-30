import { Router } from "express";
import { community_authentication } from "../../../middleware/custom/authentication";
import { validate } from "../../../middleware/packages/zod";
import {CommunityController} from "../controllers/communities_controller"
import { create_community_schema, delete_community_by_id_schema, get_community_by_id_schema, update_community_changable_properties_schema } from "../validations/communities_validations";

const community_controller: CommunityController = new CommunityController()
const router:Router  = Router()

router.use(community_authentication)

//TODO: chack all routes are working   //TODO: use each of the routes in at least integration tests


// classic CRUDS 
router.post('/createCommunity',validate(create_community_schema),community_controller.createCommunity)  
router.get('/getCommunityById/:community_id',validate(get_community_by_id_schema),community_controller.getCommunityById) 
router.post('/updateCommunityChangableProperties',validate(update_community_changable_properties_schema), community_controller.updateCommunityChangableProperties) 
router.delete('/deleteCommunityById',validate(delete_community_by_id_schema), community_controller.deleteCommunityById)

// specific flows (mostly updates)
router.post('/changeCommunityRole',community_controller.changeCommunityRole)




export {router as community_router}

