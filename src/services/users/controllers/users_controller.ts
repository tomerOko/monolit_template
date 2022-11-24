import { Request, Response, Router } from "express"
import {v4 as genereateID,} from 'uuid'
import { wrap } from "../../../utilities/function_wrapping"
import { UserService } from "../service/users_service"
import { CreateUserRespose, User } from "../types/users_types"

type This = InstanceType<typeof UserController>

export class UserController {
    
    constructor(private user_serivce = new UserService()){}

    public createUser = async (req: Request, res: Response):Promise<void>=>{
    await wrap<This['createUser']>({name: 'UserController/createUser'}, async() =>{
        let respose_data: CreateUserRespose
        try {
            const user:User={
                token: genereateID(),
                communities: [],
                country: req.body.country,
                name: req.body.name,
                email: req.body.email,
                image: req.body.image,
                role: req.body.role
            }
            await this.user_serivce.createUser(user)
            respose_data={user}
            res.status(200)
        } catch (error) {
            respose_data={error}
            res.status(500)
        }
        res.send(respose_data)
    })
}



    public async getUserById(req: Request, res: Response):Promise<void>{
    return await wrap<This['getUserById']>({name: 'UserController/getUserById'}, async() =>{

        const result = 0
        res.send(result)

    })}


    public async getAllUser(req: Request, res: Response):Promise<void>{
    return await wrap<This['getAllUser']>({name: 'UserController/getAllUser'}, async() =>{ 

        const result = 0
        res.send(result)

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
