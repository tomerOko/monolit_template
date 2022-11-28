import { NextFunction, Request, Response } from "express";
import { create_error } from "../../errors/error_factory";
import { wrap } from "../../utilities/function_wrapping";



export const validate_moderator = async (req:Request, res: Response, next: NextFunction) => {
    const result = await wrap ({name: "auth"}, async () => {
        const is_authenticated = await authMockLogic(req) 
        if (is_authenticated) {
            next()
        }else{
            const error = create_error("rounte for moderators only")
            next(error)        
        }
    })
}

const authMockLogic = async(req:Request):Promise<boolean>=>{
    return true
}