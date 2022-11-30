import { Request, Response, Router } from "express"
import { wrap, wrapSync } from "../../../utilities/function_wrapping"
import { CreateCommunityService } from "../logic/services/create_community"
import { DeleteCommunitiesService } from "../logic/services/delete_communities"
import { GetCommunitiesService } from "../logic/services/get_communities"
import { UpdateCommunityChangeblePropertiesService } from "../logic/services/update_community_changable_properties"
import { ChangeCommunityRoleRequest, ChangeCommunityRoleResponse, CreateSingleCommunityRespose, CreateCommunityRequest, DeleteSingleCommunityResponse, deleteCommunityByIdRequest, GetSingleCommunityResponse, getCommunityByIdRequest, UpdateSingleCommunityResponse, UpdateCommunityChangablePropertiesRequest, Community } from "../types/communities_types"

type This = InstanceType<typeof CommunityController>

export class CommunityController {
    
    constructor(
        private create_community_service = new CreateCommunityService(),
        private get_communities_service = new GetCommunitiesService(),
        private update_community_changeble_properties_service = new UpdateCommunityChangeblePropertiesService(),
        private delete_communities_service = new DeleteCommunitiesService()
    ){}


    public createCommunity = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createCommunity']>({name: 'CommunityController/createCommunity'}, async() =>{    
        const create_community_request:CreateCommunityRequest = req.body
        try {
            const community = await this.create_community_service.createCommunity(create_community_request)
            const respose_data: CreateSingleCommunityRespose = { created: community }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public getCommunityById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getCommunityById']>({name: 'CommunityController/getCommunityById'}, async() =>{
        const get_community_by_id_requst = req.params as getCommunityByIdRequest
        try {
            const community = await this.get_communities_service.getSingleCommunityById(get_community_by_id_requst)
            const respose_data: GetSingleCommunityResponse={community}
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}
    

    public async updateCommunityChangableProperties(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateCommunityChangableProperties']>({name: 'CommunityController/updateCommunityChangableProperties'}, async() =>{ 
        const update_community_changable_properties_request:UpdateCommunityChangablePropertiesRequest = {params: req.params as {community_id: string}, body: req.body }
        try {
            await this.update_community_changeble_properties_service.UpdateCommunityChangebleProperties(update_community_changable_properties_request)
            const community = await this.get_communities_service.getSingleCommunityById({community_id:update_community_changable_properties_request.params.community_id})
            const respose_data: UpdateSingleCommunityResponse ={ updated_community: community }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async deleteCommunityById(req: Request, res: Response):Promise<void>{
    return await wrap<This['deleteCommunityById']>({name: 'CommunityController/deleteCommunityById'}, async() =>{ 
        const delete_community_request = req.params as deleteCommunityByIdRequest
        try {
            const community = await this.get_communities_service.getSingleCommunityById({community_id: delete_community_request.community_id})
            await this.delete_communities_service.DeleteSingleCommunityById(delete_community_request)
            const respose_data: DeleteSingleCommunityResponse = { deleted_community: community }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async changeCommunityRole(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateCommunityChangableProperties']>({name: 'CommunityController/updateCommunityChangableProperties'}, async() =>{ 
        const update_community_changable_properties_request:ChangeCommunityRoleRequest = {params: req.params as {community_id: string}, body: req.body }
        try {
            await this.update_community_changeble_properties_service.UpdateCommunityChangebleProperties(update_community_changable_properties_request)
            const community = await this.get_communities_service.getSingleCommunityById({community_id:update_community_changable_properties_request.params.community_id})
            const respose_data: ChangeCommunityRoleResponse ={ updated_community: community }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}

}
