import { config } from "../../../config/confing_mock";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { CreateManyResult, MongoGenericQueris, ReadResult } from "../../../utilities/mongo_generic_queris";
import { Post } from "../types/post_types";

type This = InstanceType<typeof PostDAL>
export class PostDAL {

    private collection_name = config.system.mongo.collections.posts

    public createPost = async (post: Post):Promise<CreateManyResult> => {
    return await wrap<This["createPost"]>({name: "PostService/createPost"}, async()=>{
        const reslut = await MongoGenericQueris.createMany<Post>({collection_name:this.collection_name, values:[post]})
        return reslut
    })}

    public getPostBy = async (post_props: Partial<Post>):Promise<ReadResult<Post>> => {
    return await wrap<This["getPostBy"]>({name: "PostService/createPost"}, async()=>{
        const reslut = await MongoGenericQueris.readBy<Post>({collection_name:this.collection_name, filter:post_props})
        return reslut
    })}
}