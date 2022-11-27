/**
 * dev note - no reason for that to happan, but make sure not to create an equal key in @general_structued_status_codes and in @custom_structued_status_codes
 */

import { object } from "zod"
import { StructuedError } from "./structured_error"

type StructuredErrorMetadata = {status_code: number, error_description: string }
type StructuredErrorList = Record<string, StructuredErrorMetadata >
const general_structured_status_codes: StructuredErrorList = {
    "bad request properties error": {status_code: 400, error_description: "bed request properites (body / types of params / query)"},
    "authenticatione error": {status_code: 401, error_description: "user not logged in or there been a problem while validating the user"}, 
    "authorization error": {status_code: 403, error_description: "user is logged in but dose not have the permission for that route or specific action inside the route"},
    "not found error": {status_code: 404, error_description: "route dose not exist, or exist in different method (get / post / delete) or the params/query did not make it to the route"},
    "internal error": {status_code: 500, error_description: "any server error such as communitcation with the database or other services and external providers"},
    "bug found": {status_code:500, error_description: "some error happend through the request handling, but the error was not handled, please contact developers"}
} as const 


const custom_structured_status_codes: StructuredErrorList = {
    "email allready exist erro": {status_code: 409, error_description: "client tried to perform an action that allowed only to nun existing emails"},
    "post does not belog to user erro": {status_code: 409, error_description: "client tried to perform an action that allowed only to post owner"},
} as const

export const structued_error_codes = {
    ...general_structured_status_codes,
    ...custom_structured_status_codes
} as const


export type StructuedErrorTypes = keyof typeof structued_error_codes



export const create_error = (error_type: StructuedErrorTypes, base_error?: unknown) : StructuedError => {
    const {status_code, error_description} = structued_error_codes[error_type]
    return new StructuedError (error_type, status_code, error_description, base_error )
}





