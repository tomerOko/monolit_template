import { CountryCode } from "../../../types/coutries"
import { Community } from "../../communities____/types/community_types"

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

export type UserFilter = Partial<User>
export type UserIdFilter = {token: string}

export type SingleUserRespose = {
    user?: User,
    error?: any
}