import { NextFunction, Request, Response } from "express";
import { wrap } from "../../utilities/function_wrapping";

export const user_authentication = async (req:Request, res: Response, next: NextFunction) => {
    const result = await wrap ({name: "auth"}, async () => {
        const is_authenticated = await authMockLogic(req) 
        if (is_authenticated) {
            next()
        }else{
            res.status(401).end("un-authorized")
        }
    })
}

const authMockLogic = async(req:Request):Promise<boolean>=>{
    return true
}