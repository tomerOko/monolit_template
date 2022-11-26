import { z } from "zod"
import { CountryCode } from "../../../types/coutries"
import { CreateManyResult, DeleteResult, ReadManyResult, UpdateManyQuery, UpdateOneQuery } from "../../../utilities/mongo_generic_queris"
import { Community } from "../../communities____/types/community_types"
import { create_user_schema, delete_user_by_id_schema, get_user_by_id_schema, update_user_changable_properties_schema } from "../validations/users_validations"


//BASE types:

export const super_moderator = "super_moderator"
export const moderator = "moderator"
export const basic = "basic"
export const roles = {super_moderator, moderator, basic}
export type Role = keyof typeof roles
export const roles_array = [super_moderator, moderator, basic] as const

/**
 * A user in the system
 * system needs to support hundreds of thousands of users in the foreseeable future. 
 */
 export type User= {
    token: string, // identifier key
    communities: Community["token"][]
    country: CountryCode// assume this is always defined.
    email?: string, // most moderators + super moderators have it but not all of them.
    image?: URL, 
    name: string,
    role?: Role,
}


//HTTP types:
//requests:
export type CreateUserRequestValidated = z.infer<typeof create_user_schema>;
export type getUserByIdValidated = z.infer<typeof get_user_by_id_schema>;
export type UpdateUserChangablePropertiesRequest = z.infer<typeof update_user_changable_properties_schema>;
export type deleteUserByIdValidated = z.infer<typeof delete_user_by_id_schema>;
//responses:
export type CreateUserRespose = {
    created?: User,
    error?: any
}
export type GetUserResponse= {
    user?: User,
    error?: any
}
export type UpdateUserResponse= {
    updated_user?: User,
    error?: any
}


//Logic types
export type UserChangableProperties = UpdateUserChangablePropertiesRequest["body"]
// export type UserUpdate  מה הסרביס מחזיר




//DB types - an customization of the generic types
//queries:
export type UserFilter = Partial<User>
export type UserFilterByID = {token: string}
export type UpdateSingleUserQuery = UpdateOneQuery<User>
export type UpdateManyUserQuery = UpdateManyQuery<User>

//results:
export type DeleteUsersResult = DeleteResult
export type CreateManyUsersResult = CreateManyResult

