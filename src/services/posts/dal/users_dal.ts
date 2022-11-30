import { config } from "../../../config/confing_mock";
import { create_error } from "../../../errors/error_factory";
import { StructuedError } from "../../../errors/structured_error";
import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { MongoGenericQueris } from "../../../utilities/mongo_generic_queris";
import { CreateManyPostsResult, CreateSinglePostQuery, DeleteSinglePostQuery, DeletePostsResult, ReadManyPostQuery, ReadManyPostsResult, ReadSinglePostQuery, ReadSinglePostResult, UpdatedManyPostsResult, UpdateManyPostQuery, UpdateSinglePostQuery, UpdateSinglePostResult, Post, PostFilter } from "../types/posts_types";

type This = InstanceType<typeof PostDAL>
export class PostDAL {

    private collection_name = config.system.mongo.collections.posts

    public createPost = async (post: Post):Promise<void> => { 
    return await wrap<This["createPost"]>({name: "PostDAL/createPost"}, async()=>{
        try {
            const query: CreateSinglePostQuery = {collection_name:this.collection_name, value:post}
            await MongoGenericQueris.createSinlge<Post>(query)
        } catch (error) {
            if((error as StructuedError).type == "document was not created")
                throw create_error("post allready exist") //TODO: this in not totaly wright, if no document created it might be for diffrent reason?
            throw error
        }
    })}

    public getSinlgePostByID = async (post_props: PostFilter):Promise<Post> => {
    return await wrap<This["getSinlgePostByID"]>({name: "PostDAL/getSinlgePostBy"}, async()=>{
        try {
            const query: ReadSinglePostQuery = {collection_name:this.collection_name, filter:post_props}
            const reslut: ReadSinglePostResult = await MongoGenericQueris.readSingleBy<Post>(query)
            return reslut
        } catch (error) {
            if((error as StructuedError).type == "document was not found")
                throw create_error("no post found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
            throw error
        }
    })}

    public getPostsBy = async (post_props: PostFilter):Promise<Post []> => {
    return await wrap<This["getPostsBy"]>({name: "PostDAL/getPostsBy"}, async()=>{
        const query: ReadManyPostQuery = {collection_name:this.collection_name, filter:post_props}
        const reslut:ReadManyPostsResult = await MongoGenericQueris.readManyBy<Post>(query)
        return reslut as Post[]
    })}


    public UpdateSinglePostbByID = async (post_id: string, values_to_update: Partial<Post>):Promise<UpdateSinglePostResult> => {
    return await wrap<This["UpdateSinglePostbByID"]>({name: "PostDAL/UpdateSinglePostbByID"}, async()=>{
        const query: UpdateSinglePostQuery = {collection_name: this.collection_name, filter: {token: post_id}, update_values:values_to_update, upsert: false}
        const reslut = await MongoGenericQueris.updateSingle<Post>(query)
        return reslut
    })}


    public UpdateManyPosts = async (posts_filter: Partial<Post>, values_to_update: Partial<Post>):Promise<UpdatedManyPostsResult> => {
    return await wrap<This["UpdateManyPosts"]>({name: "PostDAL/UpdateManyPosts"}, async()=>{
        const query: UpdateManyPostQuery = {
            collection_name: this.collection_name,
            filter: posts_filter,
            update_values: values_to_update,
            upsert: false 
        }
        const reslut = await MongoGenericQueris.updateMany<Post>(query)
        return reslut
    })}

    public deleteSinlgePostByID = async (post_props: PostFilter):Promise<void> => {
        await wrap<This["deleteSinlgePostByID"]>({name: "PostDAL/deleteSinlgePostByID"}, async()=>{
            try {
                const query: DeleteSinglePostQuery = {collection_name:this.collection_name, filter:post_props}
                const reslut = await MongoGenericQueris.deleteSingle<Post>(query)
            } catch (error) {
                if((error as StructuedError).type == "document was not deleted")
                    throw create_error("no post found by ID") //TODO: this in not totaly wright, if no document found it might be for diffrent reason?
                throw error
            }
        })}

}