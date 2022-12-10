import { z } from "zod"
import { CountryCode } from "../../../types/coutries"
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../../../types/mongo_generic_types"
import { change_user_role_schema, create_user_schema, delete_user_by_id_schema, get_user_by_id_schema, update_user_changable_properties_schema } from "../validations/users_validations"


//BASE types:

export const super_moderator = "super_moderator"
export const moderator = "moderator"
export const basic = "basic"
export const roles = {super_moderator, moderator, basic} as const
export type Role = keyof typeof roles

/**
 * A user in the system
 * system needs to support hundreds of thousands of users in the foreseeable future. 
 */
 export type User= {
    token: string, // identifier key
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
export type CreateUserRequest = z.infer<typeof create_user_schema>["body"]
export type getUserByIdRequest = z.infer<typeof get_user_by_id_schema>["params"]
export type UpdateUserChangablePropertiesRequest = z.infer<typeof update_user_changable_properties_schema>
export type deleteUserByIdRequest = z.infer<typeof delete_user_by_id_schema>["params"]
export type ChangeUserRoleRequest = z.infer<typeof change_user_role_schema>

//responses:
export type CreateSingleUserRespose = {
    created: User,
}
export type GetSingleUserResponse= {
    user: User,
}
export type GetManyUsersResponse = {
    users: User[]
}
export type UpdateSingleUserResponse= {
    updated_user: User,
}
export type UpdateManyUsersResponse= {
    found: number,
    updated: number,
    upserted: number
}
export type DeleteSingleUserResponse= {
    deleted_user: User,
}
export type DeleteManyUsersResponse= {
    deleted: number,
}
export type ChangeUserRoleResponse = UpdateSingleUserResponse



//Logic types - any additional types needed through the service or helpers
export type UserChangeableProperties = UpdateUserChangablePropertiesRequest["body"]



//DB types - an customization of the generic types (DAL level)
//queries:
export type UserFilter = Partial<User>
export type UserIDFilter = {token: string}
export type UserUpdateValues = Partial<User>
export type CreateSingleUserQuery = CreateSingleQuery<User>
export type CreateManyUsersQuery = CreateManyQuery<User>
export type ReadSingleUserQuery = ReadSingleQuery<User>
export type ReadManyUserQuery = ReadManyQuery<User>
export type UpdateSingleUserQuery = UpdateQuery<User>
export type UpdateManyUserQuery = UpdateQuery<User>
export type DeleteSingleUserQuery = DeleteQuery<User>
export type DeleteManyUserQuery = DeleteQuery<User>

//results:
//there are no types for single document createion and deletion because it will work correctly or throw error
export type CreateManyUsersResult = CreateManyResult
export type ReadSingleUserResult = User
export type ReadManyUsersResult = ReadManyResult<User>
export type UpdateSingleUserResult = UpdateSinleResult
export type UpdatedManyUsersResult = UpdateManyResult
export type DeleteUsersResult = DeleteSingleResult
