/**
 * dev note - no reason for that to happan, but make sure not to create an equal key in @general_structued_status_codes and in @custom_structued_status_codes
 */
import { config } from "../config/confing_mock"
import { StructuedError, StructuedErrorParams } from "./structured_error"

const general_error_types = {
    "bad request properties error": {status_code: 400, error_description: "bed request properites (body / types of params / query)"},
    "authentication error": {status_code: 401, error_description: "user not logged in or there been a problem while validating the user"}, 
    "authorization error": {status_code: 403, error_description: "user is logged in but dose not have the permission for that route or specific action inside the route"},
    "not found error": {status_code: 404, error_description: "route dose not exist, or exist in different method (get / post / delete) or the params/query did not make it to the route"},
    "internal error": {status_code: 500, error_description: "any server error such as communitcation with the database or other services and external providers"},
    "un handled error": {status_code:500, error_description: "some error happend through the request handling, but the error was not handled, please"}
} as const 


const custom_error_types = {
    "email allready exist error": {status_code: 409, error_description: "client tried to perform an action that allowed only to nun existing emails"},
    "post does not belog to user error": {status_code: 409, error_description: "client tried to perform an action that allowed only to post owner"},
    "not moderator error": {status_code: 403, error_description: "this route is only allowed for registered users of type 'super moderator' or 'moderator' "},
    "user role not allowed error": {status_code: 403, error_description: "this route is only allowed to users with speficif role "},
    "user allready exist": {status_code: 409, error_description: "tried to create a new user but user allready exists"},
    "no user found by ID": {status_code: 409, error_description: "no user exists with the provided ID"},
} as const

const handling_logic_error_types = {
    "document was not created": {status_code: 409, error_description: "mongo communication went well but no new document created"},
    "some documents was not created": {status_code: 409, error_description: "mongo communication went well but not all of the provided objects created"},
    "document was not found": {status_code: 409, error_description: "mongo communication went well but no document found"},
    "document was not updated": {status_code: 409, error_description: "mongo communication went well but no document been updated"},
    "document was not deleted": {status_code: 409, error_description: "mongo communication went well but no document been deleted"},
    "some documents was not deleted": {status_code: 409, error_description: "mongo communication went well but no all the provided objects deleted"},
    "post does not belog to user error": {status_code: 409, error_description: "client tried to perform an action that allowed only to post owner"},
    "rounte for moderators only": {status_code: 403, error_description: "this route is only allowed for registered users of type 'super moderator' or 'moderator' "}
} as const

export const structued_error_types = {
    ...general_error_types,
    ...custom_error_types,
    ...handling_logic_error_types
} as const


export type StructuedErrorTypes = keyof typeof structued_error_types
export const default_error_structure_type:StructuedErrorTypes = "internal error"


export const create_error = (error_type: StructuedErrorTypes, base_error?: unknown, print_base_error_anyway?: boolean) : StructuedError => {
    const {status_code, error_description} = structued_error_types[error_type]
    const structued_error_params:StructuedErrorParams = {type: error_type, status_code, description: error_description, base_error, print_base_error_anyway}
    return new StructuedError (structued_error_params )
}

export const stuctureErrorIfNotStructuredYet = (error: unknown, error_structure?: StructuedErrorTypes): StructuedError => {
    if ((error as StructuedError).is_structured_error) {
        const structued_error = error as StructuedError;
        return structued_error
    } else {
        error_structure = error_structure ? error_structure : default_error_structure_type
        const structued_error = create_error(error_structure);
        return structued_error
    }
}

    



