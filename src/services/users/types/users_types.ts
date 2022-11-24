import { CountryCodes } from "../../../types/coutries"
import { Community } from "../../commuties_/types"

export const super_moderator = "super_moderator" as const
export const moderator = "moderator" as const
export type Role = keyof {super_moderator, moderator}

/**
 * A user in the system
 * system needs to support hundreds of thousands of users in the foreseeable future. 
 */
 export type User= {
    token: string, // identifier key
    name: string,
    role?: Role,
    email?: string, // most moderators + super moderators have it but not all of them.
    image?: URL, 
    country: CountryCodes// assume this is always defined.
    communities: Community["token"][]
}

export type UserFilter = Partial<User>
export type UserIdFilter = {token: string}

export type SingleUserRespose = {
    user?: User,
    error?: any
}