
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { CreateCommunityRequest, roles, Community } from "../../types/communitys_types";
import { CommunityUtils } from "../../utilities/communitys_utils";
import { CommunityLogic } from "../base_communitys_logic_class";
import {v4 as genereateID,} from 'uuid'


type This = InstanceType<typeof CreateCommunityService>

export class CreateCommunityService extends CommunityLogic {

    constructor() {super()}

    public createCommunity = async (create_community_params:  CreateCommunityRequest):Promise<Community> => {
    return await wrap<This["createCommunity"]>({name:"CreateCommunityService/createCommunity"}, async()=>{
        if(create_community_params.email) await CommunityUtils.validateMailNotExist(create_community_params.email)
        const community = this.buildCommunityObjectBeforeCreate(create_community_params)
        await CreateCommunityService.community_dal.createCommunity(community)
        return community
    })}

    private buildCommunityObjectBeforeCreate(req_body: CreateCommunityRequest): Community {
    return wrapSync<This["buildCommunityObjectBeforeCreate"]>({name:"CreateCommunityService/buildCommunityObjectBeforeCreate"},()=>{
        const community_object: Community = {
            token: genereateID(),
            communities: [],
            country: req_body.country,
            name: req_body.name,
            email: req_body.email,
            image: req_body.image as URL | undefined,
            role: req_body.role ? req_body.role : roles.basic,
            created_at: new Date(),
            updated_at: new Date()
        }
        return community_object
    })}

}

