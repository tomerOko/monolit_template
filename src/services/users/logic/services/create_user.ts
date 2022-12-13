
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { CreateUserRequest, roles, User } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserService } from "../base_users_service_class";
import {v4 as genereateID,} from 'uuid'



export class CreateUserService extends UserService {

    constructor() {super()}

    public createUser = async (create_user_params:  CreateUserRequest):Promise<User> => {
    return await wrap({name:"CreateUserService/createUser"}, async()=>{
        await UserUtils.validateMailNotExist(create_user_params.email)
        const user = this.buildUserObjectBeforeCreate(create_user_params)
        await UserService.user_dal.createUser(user)
        return user
    })}

    private buildUserObjectBeforeCreate(req_body: CreateUserRequest): User {
    return wrapSync({name:"CreateUserService/buildUserObjectBeforeCreate"},()=>{
        const user_object: User = {
            token: genereateID(),
            country: req_body.country,
            name: req_body.name,
            email: req_body.email,
            image: req_body.image as URL | undefined,
            role: req_body.role ? req_body.role : roles.basic,
            created_at: new Date(),
            updated_at: new Date()
        }
        return user_object
    })}

}

