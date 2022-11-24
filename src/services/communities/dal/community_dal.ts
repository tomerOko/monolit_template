import { config } from "../../../config/confing_mock";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CreateManyResult, MongoGenericQueris, ReadResult } from "../../../utilities/mongo_generic_queris";
import { Community } from "../types/community_types";

type This = InstanceType<typeof CommunityDAL>
export class CommunityDAL {

    private collection_name = config.system.mongo.collections.communitys

    public createCommunity = async (community: Community):Promise<CreateManyResult> => {
    return await wrap<This["createCommunity"]>({name: "CommunityService/createCommunity"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<Community>({collection_name:this.collection_name, values:[community]})
        return reslut
    })}

    public getCommunityBy = async (community_props: Partial<Community>):Promise<ReadResult<Community>> => {
    return await wrap<This["getCommunityBy"]>({name: "CommunityService/createCommunity"}, async()=>{
        const reslut = await MongoGenericQueris.readBy<Community>({collection_name:this.collection_name, filter:community_props})
        return reslut
    })}
}