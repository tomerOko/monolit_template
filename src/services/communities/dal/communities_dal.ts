import { config } from "../../../config/confing_mock";
import { create_error } from "../../../errors/error_factory";
import { StructuedError } from "../../../errors/structured_error";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { CreateManyCommunitiesResult, CreateSingleCommunityQuery, DeleteSingleCommunityQuery, DeleteCommunitiesResult, ReadManyCommunityQuery, ReadManyCommunitiesResult, ReadSingleCommunityQuery, ReadSingleCommunityResult, UpdatedManyCommunitiesResult, UpdateManyCommunityQuery, UpdateSingleCommunityQuery, UpdateSingleCommunityResult, Community, CommunityFilter } from "../types/communities_types";

type This = InstanceType<typeof CommunityDAL>
export class CommunityDAL {

    private collection_name = config.system.mongo.collections.communities

    public createCommunity = async (community: Community):Promise<void> => { 
    return await wrap<This["createCommunity"]>({name: "CommunityDAL/createCommunity"}, async()=>{
        try {
            const query: CreateSingleCommunityQuery = {collection_name:this.collection_name, value:community}
            await MongoGenericQueris.createSinlge<Community>(query)
        } catch (error) {
            if((error as StructuedError).type == "document was not created")
                throw create_error("community allready exist") //TODO: this in not totaly wright, if no document created it might be for diffrent reason?
            throw error
        }
    })}

    public getSinlgeCommunityByID = async (community_props: CommunityFilter):Promise<Community> => {
    return await wrap<This["getSinlgeCommunityByID"]>({name: "CommunityDAL/getSinlgeCommunityBy"}, async()=>{
        try {
            const query: ReadSingleCommunityQuery = {collection_name:this.collection_name, filter:community_props}
            const reslut: ReadSingleCommunityResult = await MongoGenericQueris.readSingleBy<Community>(query)
            return reslut
        } catch (error) {
            if((error as StructuedError).type == "document was not found")
                throw create_error("no community found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
            throw error
        }
    })}

    public getCommunitiesBy = async (community_props: CommunityFilter):Promise<Community []> => {
    return await wrap<This["getCommunitiesBy"]>({name: "CommunityDAL/getCommunitiesBy"}, async()=>{
        const query: ReadManyCommunityQuery = {collection_name:this.collection_name, filter:community_props}
        const reslut:ReadManyCommunitiesResult = await MongoGenericQueris.readManyBy<Community>(query)
        return reslut as Community[]
    })}


    public UpdateSingleCommunitybByID = async (community_id: string, values_to_update: Partial<Community>):Promise<UpdateSingleCommunityResult> => {
    return await wrap<This["UpdateSingleCommunitybByID"]>({name: "CommunityDAL/UpdateSingleCommunitybByID"}, async()=>{
        const query: UpdateSingleCommunityQuery = {collection_name: this.collection_name, filter: {token: community_id}, update_values:values_to_update, upsert: false}
        const reslut = await MongoGenericQueris.updateSingle<Community>(query)
        return reslut
    })}


    public UpdateManyCommunities = async (communities_filter: Partial<Community>, values_to_update: Partial<Community>):Promise<UpdatedManyCommunitiesResult> => {
    return await wrap<This["UpdateManyCommunities"]>({name: "CommunityDAL/UpdateManyCommunities"}, async()=>{
        const query: UpdateManyCommunityQuery = {
            collection_name: this.collection_name,
            filter: communities_filter,
            update_values: values_to_update,
            upsert: false 
        }
        const reslut = await MongoGenericQueris.updateMany<Community>(query)
        return reslut
    })}

    public deleteSinlgeCommunityByID = async (community_props: CommunityFilter):Promise<void> => {
        await wrap<This["deleteSinlgeCommunityByID"]>({name: "CommunityDAL/deleteSinlgeCommunityByID"}, async()=>{
            try {
                const query: DeleteSingleCommunityQuery = {collection_name:this.collection_name, filter:community_props}
                const reslut = await MongoGenericQueris.deleteSingle<Community>(query)
            } catch (error) {
                if((error as StructuedError).type == "document was not deleted")
                    throw create_error("no community found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
                throw error
            }
        })}

}