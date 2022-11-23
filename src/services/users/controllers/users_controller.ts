import { Request, Response } from "express"
import {v4 as genereateID, v4} from 'uuid'
import { wrap } from "../../../utilities/functionWrapping"
import { UserService } from "../service/users_service"
import { User } from "../types/users_types"

type This = InstanceType<typeof UserController>

export class UserController {

    constructor(
        private user_serivce = new UserService()
    ){}

    public async createUser(req: Request, res: Response):Promise<void>{
    await wrap<This['createUser']>(async(req, res) =>{

        const user:User={
            token: v4(),
            communities: [],
            country: req.body.country,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            role: req.body.role
        }
        //todo: validate params
        this.user_serivce.createUser(user)
        //todo: build some pre-sending response parsing mechanism

    },[req, res], 'UserController/createUser')}


    public async getUserById(req: Request, res: Response):Promise<void>{
    return await wrap<This['getUserById']>(async(req, res) =>{

        const result = 0
        res.send(result)

    },[req, res], 'UserController/getUserById')}


    public async getAllUser(req: Request, res: Response):Promise<void>{
    return await wrap<This['getAllUser']>(async(req, res) =>{ 

        const result = 0
        res.send(result)

    },[req, res], 'UserController/getAllUser')}


    public async updateUser(req: Request, res: Response):Promise<void>{
    return await wrap<This['updateUser']>(async(req, res) =>{ 

        const result = 0
        res.send(result)

    },[req, res], 'UserController/updateUser')}


    public async deleteUserById(req: Request, res: Response):Promise<void>{
    return await wrap<This['deleteUserById']>(async(req, res) =>
    { 
        const result = 0
        res.send(result)

    },[req, res], 'UserController/deleteUserById')}


}
