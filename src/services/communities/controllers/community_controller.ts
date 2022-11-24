import { Request, Response, Router } from "express"
import {v4 as genereateID,} from 'uuid'
import { wrap } from "../../../utilities/function_wrapping"
import { CommunityService } from "../service/community_service"
import { SingleCommunityRespose, Community, CommunityIdFilter } from "../types/community_types"

type This = InstanceType<typeof CommunityController>

export class CommunityController {
    
    constructor(private community_serivce = new CommunityService()){}

    public createCommunity = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createCommunity']>({name: 'CommunityController/createCommunity'}, async() =>{
        let respose_data: SingleCommunityRespose
        try {
            const now = new Date()
            const community:Community={
                token: genereateID(),
                users: [],
                image: req.body.image,
                title: req.body.image,
                user_count: 0,
                date_created: now
            }
            await this.community_serivce.createCommunity(community)
            respose_data={community}
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
    })
}



    public getCommunityById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getCommunityById']>({name: 'CommunityController/getCommunityById'}, async() =>{
        let respose_data: SingleCommunityRespose
        try {
            const community_id_filter:CommunityIdFilter={
                token: req.params.community_id
            }
            const community = await this.community_serivce.getCommunityById(community_id_filter)
            respose_data={community}
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
    })}


    public async getAllCommunity(req: Request, res: Response):Promise<void>{
    return await wrap<This['getAllCommunity']>({name: 'CommunityController/getAllCommunity'}, async() =>{ 

        const result = 0
        res.send(result)

    })}


    public async updateCommunity(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateCommunity']>({name: 'CommunityController/updateCommunity'}, async() =>{ 

        const result = 0
        res.send(result)

    })}


    public async deleteCommunityById(req: Request, res: Response):Promise<void>{
    return await wrap<This['deleteCommunityById']>({name: 'CommunityController/deleteCommunityById'}, async() =>
    { 
        const result = 0
        res.send(result)

    })}


}
