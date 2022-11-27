import { Request, Response, Router } from "express"
import {v4 as genereateID,} from 'uuid'
import { CountryCode } from "../../../types/coutries"
import { wrap, wrapSync } from "../../../utilities/function_wrapping"
import { CreateUser } from "../logic/services/create_user"
import { GetUsers } from "../logic/services/get_users"
import { CreateUserRequestValidated, CreateUserRespose, getUserByIdValidated, GetUserResponse, UpdateUserChangablePropertiesRequest, UpdateUserResponse, User } from "../types/users_types"

type This = InstanceType<typeof UserController>

export class UserController {
    
    constructor(
        private create_user = new CreateUser(),
        private get_users = new GetUsers()
    ){}


    /**
     * sends @type CreateUserRespose
     */
    public createUser = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createUser']>({name: 'UserController/createUser'}, async() =>{    
        const req_body:CreateUserRequestValidated["body"] = req.body
        try {
            const user:User=this.buildUserObjectBeforeCreate(req_body)
            await this.create_user.createUser(user)
            const respose_data: CreateUserRespose = { created: user }
            res.status(200).send(respose_data)
        } catch (error) {
            res.status(500).send(error)
        }
    })}

    /**
     * sends @type CreateUserRespose
     */
    public getUserById = async (req: Request, res: Response):Promise<void> => {
    return await wrap<This['getUserById']>({name: 'UserController/getUserById'}, async() =>{
        const req_params = req.params as getUserByIdValidated["params"]
        let respose_data: GetUserResponse
        try {
            const user = await this.get_users.getSingleUserById(req_params.user_id)
            respose_data={user}
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
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


    public async updateUserChangableProperties(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateUserChangableProperties']>({name: 'UserController/updateUserChangableProperties'}, async() =>{ 

        const req_body:UpdateUserChangablePropertiesRequest["body"] = req.body
        let respose_data:UpdateUserResponse = {}
        try {
            //create update object
            //update with the dal
            respose_data={ updated_user: user }
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)

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
