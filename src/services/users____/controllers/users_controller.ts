import { Request, Response, Router } from "express"
import {v4 as genereateID,} from 'uuid'
import { CountryCode } from "../../../types/coutries"
import { wrap, wrapSync } from "../../../utilities/function_wrapping"
import { CreateUser } from "../logic/services/create_user"
import { GetUsers } from "../logic/services/get_users"
import { CreateUserRespose, GetUserResponse, UpdateUserResponse, User } from "../types/users_types"
import { CreateUserRequestValidated, getUserByIdValidated, UpdateUserChangablePropertiesRequest } from "../validations/users_validations"

type This = InstanceType<typeof UserController>

export class UserController {
    
    constructor(
        private create_user = new CreateUser(),
        private get_users = new GetUsers()
    ){}

    public createUser = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createUser']>({name: 'UserController/createUser'}, async() =>{    
        const req_body:CreateUserRequestValidated["body"] = req.body
        let respose_data: CreateUserRespose
        try {
            const user:User=this.buildUserObjectBeforeCreate(req_body)
            await this.create_user.createUser(user)
            respose_data={ created: user }
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
    })}



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
            const user:User=this.buildUserObjectBeforeCreate(req_body)
            await this.create_user.createUser(user)
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
