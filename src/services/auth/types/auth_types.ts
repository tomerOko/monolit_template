import { z } from "zod"
import { CountryCode } from "../../../types/coutries"
import { CreateManyQuery, CreateManyResult, CreateSingleQuery, DeleteQuery, DeleteSingleResult, ReadManyQuery, ReadManyResult, ReadSingleQuery, UpdateManyResult, UpdateQuery, UpdateSinleResult } from "../../../types/mongo_generic_types"



 export type Auth= {
    some: string,
    data: string,
}




//HTTP types (controller level):
//requests:


//responses:
export type CreateSingleAuthRespose = {
    created: Auth,
}
export type GetSingleAuthResponse= {
    auth: Auth,
}
export type GetManyAuthsResponse = {
    auths: Auth[]
}
export type UpdateSingleAuthResponse= {
    updated_auth: Auth,
}
export type UpdateManyAuthsResponse= {
    found: number,
    updated: number,
    upserted: number
}
export type DeleteSingleAuthResponse= {
    deleted_auth: Auth,
}
export type DeleteManyAuthsResponse= {
    deleted: number,
}
export type ChangeAuthRoleResponse = UpdateSingleAuthResponse





//DB types - an customization of the generic types (DAL level)
//queries:
export type AuthFilter = Partial<Auth>
export type AuthIDFilter = {token: string}
export type AuthUpdateValues = Partial<Auth>
export type CreateSingleAuthQuery = CreateSingleQuery<Auth>
export type CreateManyAuthsQuery = CreateManyQuery<Auth>
export type ReadSingleAuthQuery = ReadSingleQuery<Auth>
export type ReadManyAuthQuery = ReadManyQuery<Auth>
export type UpdateSingleAuthQuery = UpdateQuery<Auth>
export type UpdateManyAuthQuery = UpdateQuery<Auth>
export type DeleteSingleAuthQuery = DeleteQuery<Auth>
export type DeleteManyAuthQuery = DeleteQuery<Auth>

//results:
//there are no types for single document createion and deletion because it will work correctly or throw error
export type CreateManyAuthsResult = CreateManyResult
export type ReadSingleAuthResult = Auth
export type ReadManyAuthsResult = ReadManyResult<Auth>
export type UpdateSingleAuthResult = UpdateSinleResult
export type UpdatedManyAuthsResult = UpdateManyResult
export type DeleteAuthsResult = DeleteSingleResult
