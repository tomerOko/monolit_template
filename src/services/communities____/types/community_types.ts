import { User } from "../../users____/types/users_types"

/**
 * the system needs to support hundreds of communities in the foreseeable future.
 */
 export type Community= {
    token: string, // identifier key
    title: string, // text with up to 60 chars
    image: URL, // For the purpose of this exercise, you don’t have to support image uploading and can assume it was already uploaded using a different system
    description: string,
    user_count: number, // number of users who joined this community
    users: User["token"][], //user list of the Communtiy
    date_created: Date,
    date_updated: Date
}


export type CommunityFilter = Partial<Community>
export type CommunityIdFilter = {token: string}

export type SingleCommunityRespose = {
    community?: Community,
    error?: any
}