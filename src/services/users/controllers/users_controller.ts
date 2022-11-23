import { Request, Response } from "express"
import {v4 as genereateID,} from 'uuid'
import { wrap } from "../../../utilities/function_wrapping"
import { UserService } from "../service/users_service"
import { User } from "../types/users_types"

type This = InstanceType<typeof UserController>

export class UserController {
    
    private user_serivce;

    constructor(){
        this.user_serivce = new UserService()
    }

    public async createUser(req: Request, res: Response):Promise<void>{
    // await wrap<This['createUser']>({name: 'UserController/createUser'}, async() =>{

        const user:User={
            token: genereateID(),
            communities: [],
            country: req.body.country,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            role: req.body.role
        }
        console.log("byee", this.user_serivce)
        // await this.user_serivce.createUser(user)
        //todo: build some pre-sending response parsing mechanism

    // })
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
