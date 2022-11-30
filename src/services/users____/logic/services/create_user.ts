
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { CreateUserRequest, roles, User } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";
import {v4 as genereateID,} from 'uuid'


type This = InstanceType<typeof CreateUserService>

export class CreateUserService extends UserLogic {

    constructor() {super()}

    public createUser = async (create_user_params:  CreateUserRequest):Promise<User> => {
    return await wrap<This["createUser"]>({name:"CreateUserService/createUser"}, async()=>{
        if(create_user_params.email) await UserUtils.validateMailNotExist(create_user_params.email)
        const user = this.buildUserObjectBeforeCreate(create_user_params)
        await CreateUserService.user_dal.createUser(user)
        return user
    })}

    private buildUserObjectBeforeCreate(req_body: CreateUserRequest): User {
    return wrapSync<This["buildUserObjectBeforeCreate"]>({name:"CreateUserService/buildUserObjectBeforeCreate"},()=>{
        const user_object: User = {
            token: genereateID(),
            communities: [],
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

