import { Request, Response } from "express"
import {v4 as genereateID} from 'uuid'
import { wrap } from "../../../utilities/functionWrapping"

type This = InstanceType<typeof UserController>

export class UserController {

    constructor(){}

    public async createUser(req: Request, res: Response):Promise<void>{
    await wrap<This['createUser']>(async(req, res) =>{

        const result = 0
        res.send(result)

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
