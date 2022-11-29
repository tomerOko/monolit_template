import { Request, Response, Router } from "express"
import { wrap, wrapSync } from "../../../utilities/function_wrapping"
import { CreateUserService } from "../logic/services/create_user"
import { GetUsersService } from "../logic/services/get_users"
import { UpdateUserChangeblePropertiesService } from "../logic/services/update_user_changable_properties"
import { CreateUserRequest, CreateUserRespose, getUserByIdRequest, GetUserResponse, UpdateUserChangablePropertiesRequest, UpdateUserResponse, User } from "../types/users_types"

type This = InstanceType<typeof UserController>

export class UserController {
    
    constructor(
        private create_user_service = new CreateUserService(),
        private get_users_service = new GetUsersService(),
        private update_user_changeble_properties_service = new UpdateUserChangeblePropertiesService()
    ){}


    /**
     * sends @type CreateUserRespose
     */
    public createUser = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createUser']>({name: 'UserController/createUser'}, async() =>{    
        const create_user_request:CreateUserRequest = req.body
        try {
            const user = await this.create_user_service.createUser(create_user_request)
            const respose_data: CreateUserRespose = { created: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}

    /**
     * sends @type GetUserResponse
     */
    public getUserById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getUserById']>({name: 'UserController/getUserById'}, async() =>{
        const get_user_by_id_requst = req.params as getUserByIdRequest
        let respose_data: GetUserResponse
        try {
            const user = await this.get_users_service.getSingleUserById(get_user_by_id_requst)
            respose_data={user}
            res.status(200)
        } catch (error) {
            res.status(500).send(error)
        }
    })}

    public async updateUserChangableProperties(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateUserChangableProperties']>({name: 'UserController/updateUserChangableProperties'}, async() =>{ 
        const update_user_changable_properties_request:UpdateUserChangablePropertiesRequest = {params: req.params as {user_id: string}, body: req.body }
        try {
            this.update_user_changeble_properties_service.UpdateUserChangebleProperties(update_user_changable_properties_request)
            const user = await this.get_users_service.getSingleUserById(update_user_changable_properties_request.params)
            const respose_data: UpdateUserResponse ={ updated_user: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async updateUser(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateUser']>({name: 'UserController/updateUser'}, async() =>{ 

        const result = 0
        res.send(result)

    })}


    public async deleteUserById(req: Request, res: Response):Promise<void>{
    return await wrap<This['deleteUserById']>({name: 'UserController/deleteUserById'}, async() =>
    { 
        const result = 0
        res.send(result)

    })}


}
