import { Request, Response } from "express"
import {v4 as genereateID} from 'uuid'
import { wrap } from "../../../utilities/functionWrapping"


export class UserController {

    constructor(){}

    
    public createUsers(req: Request, res: Response):void{
        const result = wrap<InstanceType<typeof UserController>['createUsers']>((req: Request, res: Response):void=>{
            const result = 0
            res.send(result)
        },[req, res], 'UserController/createUser')
    }

    public async createUser(req: Request, res: Response):Promise<void>{
        //logic
        //return
        const result = 0
        res.send(result)
    }

    public async getUserById(req: Request, res: Response):Promise<void>{
        //logic
        //return
        const result = 0
        res.send(result)
    }

    public async getAllUser(req: Request, res: Response):Promise<void>{
        //logic
        //return
        const result = 0
        res.send(result)
    }

    public async updateUser(req: Request, res: Response):Promise<void>{
        //logic
        //return
        const result = 0
        res.send(result)
    }

    public async deleteUserById(req: Request, res: Response):Promise<void>{
        //logic
        //return
        const result = 0
        res.send(result)
    }

}
