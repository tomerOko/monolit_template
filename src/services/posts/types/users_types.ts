import { z } from "zod"
import { CountryCode } from "../../../types/coutries"
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../../../types/mongo_generic_types"
import { Community } from "../../refactor/community_types"
import { change_post_role_schema, create_post_schema, delete_post_by_id_schema, get_post_by_id_schema, update_post_changable_properties_schema } from "../validations/posts_validations"


//BASE types:

export const super_moderator = "super_moderator"
export const moderator = "moderator"
export const basic = "basic"
export const roles = {super_moderator, moderator, basic} as const
export type Role = keyof typeof roles

/**
 * A post in the system
 * system needs to support hundreds of thousands of posts in the foreseeable future. 
 */
 export type Post= {
    token: string, // identifier key
    communities: Community["token"][]
    country: CountryCode// assume this is always defined.
    email?: string, // most moderators + super moderators have it but not all of them.
    image?: URL, 
    name: string,
    role: Role,
    created_at: Date,
    updated_at: Date
}




//HTTP types (controller level):
//requests:
export type CreatePostRequest = z.infer<typeof create_post_schema>["body"]
export type getPostByIdRequest = z.infer<typeof get_post_by_id_schema>["params"]
export type UpdatePostChangablePropertiesRequest = z.infer<typeof update_post_changable_properties_schema>
export type deletePostByIdRequest = z.infer<typeof delete_post_by_id_schema>["params"]
export type ChangePostRoleRequest = z.infer<typeof change_post_role_schema>

//responses:
export type CreateSinglePostRespose = {
    created: Post,
}
export type GetSinglePostResponse= {
    post: Post,
}
export type GetManyPostsResponse = {
    posts: Post[]
}
export type UpdateSinglePostResponse= {
    updated_post: Post,
}
export type UpdateManyPostsResponse= {
    found: number,
    updated: number,
    upserted: number
}
export type DeleteSinglePostResponse= {
    deleted_post: Post,
}
export type DeleteManyPostsResponse= {
    deleted: number,
}
export type ChangePostRoleResponse = UpdateSinglePostResponse



//Logic types - any additional types needed through the service or helpers
export type PostChangeableProperties = UpdatePostChangablePropertiesRequest["body"]



//DB types - an customization of the generic types (DAL level)
//queries:
export type PostFilter = Partial<Post>
export type PostFilterByID = {token: string}
export type CreateSinglePostQuery = CreateSingleQuery<Post>
export type CreateManyPostsQuery = CreateManyQuery<Post>
export type ReadSinglePostQuery = ReadSingleQuery<Post>
export type ReadManyPostQuery = ReadManyQuery<Post>
export type UpdateSinglePostQuery = UpdateQuery<Post>
export type UpdateManyPostQuery = UpdateQuery<Post>
export type DeleteSinglePostQuery = DeleteQuery<Post>
export type DeleteManyPostQuery = DeleteQuery<Post>

//results:
//there are no types for single document createion and deletion because it will work correctly or throw error
export type CreateManyPostsResult = CreateManyResult
export type ReadSinglePostResult = Post
export type ReadManyPostsResult = ReadManyResult<Post>
export type UpdateSinglePostResult = UpdateSinleResult
export type UpdatedManyPostsResult = UpdateManyResult
export type DeletePostsResult = DeleteSingleResult
