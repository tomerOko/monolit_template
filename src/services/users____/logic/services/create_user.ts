
import { CountryCode } from "../../../../types/coutries";
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { CreateUserRequestValidated, User } from "../../types/users_types";
import { UserUtils } from "../../utilities/users_utils";
import { UserLogic } from "../base_users_logic_class";
import {v4 as genereateID,} from 'uuid'
import { create_error } from "../../../../errors/error_factory";


type This = InstanceType<typeof CreateUser>

export class CreateUser extends UserLogic {

    constructor() {super()}

    public createUser = async (create_user_params:  CreateUserRequestValidated["body"]):Promise<User> => {
    return await wrap<This["createUser"]>({name:"CreateUser/createUser"}, async()=>{
        if(create_user_params.email) await UserUtils.validateMailNotExist(create_user_params.email)
        const user = this.buildUserObjectBeforeCreate(create_user_params)
        const query_result = await CreateUser.user_dal.createUser(user)
        if(!query_result.inserted) throw create_error("internal error")
        return user
    })}

    private buildUserObjectBeforeCreate(req_body: CreateUserRequestValidated["body"]): User {
        return wrapSync<This["buildUserObjectBeforeCreate"]>({name:"UserController/buildUserObjectBeforeCreate"},()=>{
            return {
                token: genereateID(),
                communities: [],
                country: req_body.country as CountryCode,
                name: req_body.name,
                email: req_body.email,
                image: req_body.image as URL | undefined,
                role: req_body.role
            }
        })}

}

