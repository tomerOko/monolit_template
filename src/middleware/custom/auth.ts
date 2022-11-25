import { NextFunction, Request, Response } from "express";
import { moderator, super_moderator } from "../../services/users____/types/users_types";
import { wrap } from "../../utilities/function_wrapping";

export const user_authentication = async (req:Request, res: Response, next: NextFunction) => {
    const result = await wrap ({name: "user_authentication"}, async () => {
        const is_authenticated = await authMockLogic(req) 
        if (is_authenticated) {
            next()
        }else{
            res.status(401).end("this route is only allowed for registered users")
        }
    })
}

export const admin_authentication = async (req:Request, res: Response, next: NextFunction) => {
    const result = await wrap ({name: "auth"}, async () => {
        const is_authenticated = await authMockLogic(req) 
        if (is_authenticated) {
            next()
        }else{
            res.status(401).end(`this route is only allowed for registered users of type '${super_moderator}' or ${moderator} `)
        }
    })
}

const authMockLogic = async(req:Request):Promise<boolean>=>{
    return true
}