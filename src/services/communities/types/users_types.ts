import { z } from "zod"
import { CountryCode } from "../../../types/coutries"
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../../../types/mongo_generic_types"
import { Community } from "../../refactor/community_types"
import { change_community_role_schema, create_community_schema, delete_community_by_id_schema, get_community_by_id_schema, update_community_changable_properties_schema } from "../validations/communities_validations"


//BASE types:

export const super_moderator = "super_moderator"
export const moderator = "moderator"
export const basic = "basic"
export const roles = {super_moderator, moderator, basic} as const
export type Role = keyof typeof roles

/**
 * A community in the system
 * system needs to support hundreds of thousands of communities in the foreseeable future. 
 */
 export type Community= {
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
export type CreateCommunityRequest = z.infer<typeof create_community_schema>["body"]
export type getCommunityByIdRequest = z.infer<typeof get_community_by_id_schema>["params"]
export type UpdateCommunityChangablePropertiesRequest = z.infer<typeof update_community_changable_properties_schema>
export type deleteCommunityByIdRequest = z.infer<typeof delete_community_by_id_schema>["params"]
export type ChangeCommunityRoleRequest = z.infer<typeof change_community_role_schema>

//responses:
export type CreateSingleCommunityRespose = {
    created: Community,
}
export type GetSingleCommunityResponse= {
    community: Community,
}
export type GetManyCommunitiesResponse = {
    communities: Community[]
}
export type UpdateSingleCommunityResponse= {
    updated_community: Community,
}
export type UpdateManyCommunitiesResponse= {
    found: number,
    updated: number,
    upserted: number
}
export type DeleteSingleCommunityResponse= {
    deleted_community: Community,
}
export type DeleteManyCommunitiesResponse= {
    deleted: number,
}
export type ChangeCommunityRoleResponse = UpdateSingleCommunityResponse



//Logic types - any additional types needed through the service or helpers
export type CommunityChangeableProperties = UpdateCommunityChangablePropertiesRequest["body"]



//DB types - an customization of the generic types (DAL level)
//queries:
export type CommunityFilter = Partial<Community>
export type CommunityFilterByID = {token: string}
export type CreateSingleCommunityQuery = CreateSingleQuery<Community>
export type CreateManyCommunitiesQuery = CreateManyQuery<Community>
export type ReadSingleCommunityQuery = ReadSingleQuery<Community>
export type ReadManyCommunityQuery = ReadManyQuery<Community>
export type UpdateSingleCommunityQuery = UpdateQuery<Community>
export type UpdateManyCommunityQuery = UpdateQuery<Community>
export type DeleteSingleCommunityQuery = DeleteQuery<Community>
export type DeleteManyCommunityQuery = DeleteQuery<Community>

//results:
//there are no types for single document createion and deletion because it will work correctly or throw error
export type CreateManyCommunitiesResult = CreateManyResult
export type ReadSingleCommunityResult = Community
export type ReadManyCommunitiesResult = ReadManyResult<Community>
export type UpdateSingleCommunityResult = UpdateSinleResult
export type UpdatedManyCommunitiesResult = UpdateManyResult
export type DeleteCommunitiesResult = DeleteSingleResult
