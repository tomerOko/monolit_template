import { Request, Response, Router } from "express"
import { wrap, wrapSync } from "../../../utilities/function_wrapping"
import { CreateUserService } from "../logic/services/create_user"
import { DeleteUsersService } from "../logic/services/delete_users"
import { GetUsersService } from "../logic/services/get_users"
import { UpdateUserChangeblePropertiesService } from "../logic/services/update_user_changable_properties"
import { ChangeUserRoleRequest, ChangeUserRoleResponse, CreateSingleUserRespose, CreateUserRequest, DeleteSingleUserResponse, deleteUserByIdRequest, GetSingleUserResponse, getUserByIdRequest, UpdateSingleUserResponse, UpdateUserChangablePropertiesRequest, User } from "../types/users_types"

type This = InstanceType<typeof UserController>

export class UserController {
    
    constructor(
        private create_user_service = new CreateUserService(),
        private get_users_service = new GetUsersService(),
        private update_user_changeble_properties_service = new UpdateUserChangeblePropertiesService(),
        private delete_users_service = new DeleteUsersService()
    ){}


    public createUser = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createUser']>({name: 'UserController/createUser'}, async() =>{    
        const create_user_request:CreateUserRequest = req.body
        try {
            const user = await this.create_user_service.createUser(create_user_request)
            const respose_data: CreateSingleUserRespose = { created: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public getUserById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getUserById']>({name: 'UserController/getUserById'}, async() =>{
        const get_user_by_id_requst = req.params as getUserByIdRequest
        try {
            const user = await this.get_users_service.getSingleUserById(get_user_by_id_requst)
            const respose_data: GetSingleUserResponse={user}
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}
    

    public async updateUserChangableProperties(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateUserChangableProperties']>({name: 'UserController/updateUserChangableProperties'}, async() =>{ 
        const update_user_changable_properties_request:UpdateUserChangablePropertiesRequest = {params: req.params as {user_id: string}, body: req.body }
        try {
            await this.update_user_changeble_properties_service.UpdateUserChangebleProperties(update_user_changable_properties_request)
            const user = await this.get_users_service.getSingleUserById({user_id:update_user_changable_properties_request.params.user_id})
            const respose_data: UpdateSingleUserResponse ={ updated_user: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async deleteUserById(req: Request, res: Response):Promise<void>{
    return await wrap<This['deleteUserById']>({name: 'UserController/deleteUserById'}, async() =>{ 
        const delete_user_request = req.params as deleteUserByIdRequest
        try {
            const user = await this.get_users_service.getSingleUserById({user_id: delete_user_request.user_id})
            await this.delete_users_service.DeleteSingleUserById(delete_user_request)
            const respose_data: DeleteSingleUserResponse = { deleted_user: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}


    public async changeUserRole(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateUserChangableProperties']>({name: 'UserController/updateUserChangableProperties'}, async() =>{ 
        const change_user_role_request:ChangeUserRoleRequest = {params: req.params as {authorized_moderator_id: string}, body: req.body }
        try {
            await this.update_user_changeble_properties_service.UpdateUserChangebleProperties(update_user_changable_properties_request)
            const user = await this.get_users_service.getSingleUserById({user_id:update_user_changable_properties_request.params.user_id})
            const respose_data: ChangeUserRoleResponse ={ updated_user: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}

}
