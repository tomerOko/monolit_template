import { Request, Response } from "express"
import {UserModel} from '../models/UserModel'
import {v4 as genereateID} from 'uuid'
import { IUserRequest, IUserId, IUser, IUserStatus } from "../types/User"
import { Error } from "mongoose";



const createUser = async (req: Request, res: Response) => {
    console.log(req.body)
    const body = req.body as IUserRequest
    if(!body.email){
        res.send("bad request")
        return;
    }
    const newUSer = new UserModel({
        SID: genereateID(),
        firstName: body.firstName,
        lastName: body.lastName,
        status: body.status,
        email:body.email,
      })
    const result = await newUSer.save().catch( err => handleErrors(err as Error))
    res.send((result as IUser).SID)
}

const retriveUserById = async (req: Request, res: Response) => { //not using 'get' in order to send payload in the body and not in the url
    const body = req.body as IUserId
    const filter = { SID:  body.SID };
    const result = await UserModel.find(filter).catch( err => handleErrors(err as Error))
    res.send(result)
}

const getAllUsers = async (req: Request, res: Response) => { 
    const body = req.body as IUserRequest
    const result = await UserModel.find().catch( err => handleErrors(err as Error))
    res.send(result)
}

const deleteUsersById = async (req: Request, res: Response) => {
    const body = req.body as {usersToDelete : IUserId[]}
    const idList: string [] = body.usersToDelete.map(x => x.SID)
    const result = await UserModel.deleteMany({SID: {$in: idList}}).catch( err => handleErrors(err as Error))
    res.send("all deleted")
}

const setUserStatus = async (req: Request, res: Response) => {
    console.log(req.body)
    const body = req.body as IUserStatus
    if(!body.status){
        res.send("bad request")
        return;
    }
    const filter = { SID:  body.SID };
    const fieldsAndValue = { status : body.status };
    const result = await UserModel.findOneAndUpdate(filter, fieldsAndValue).catch( err => handleErrors(err as Error))
    res.send((result as IUser).SID)
}

const userControllers = {createUser, retriveUserById, getAllUsers, deleteUsersById, setUserStatus}
export {  userControllers }

const handleErrors = (err:Error) => {
    console.warn(err);
    //todo
    //add explenations to client developer (how is me) 
    //todo
    //maybe move all of this error handling to another file?
    let returnMessage = ""
    switch (err.message) {
        case "somthing":
            returnMessage = "the problem is 'somthing' "
            break;
        default:
            returnMessage = 'some general error..'
            break;
    } 
    return new Response(JSON.stringify({
        code: 400,
        message: returnMessage
    }));
};
