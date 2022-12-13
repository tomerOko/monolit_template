import { NextFunction, Request, Response } from "express";
import { create_error } from "../../errors/error_factory";
import { wrap } from "../../utilities/function_wrapping";

export const user_authentication = async (req:Request, res: Response, next: NextFunction) => {
    const result = await wrap ({name: "user_authentication"}, async () => {
        const is_authenticated = await authMockLogic(req) 
        if (is_authenticated) {
            next()
        }else{
            const error = create_error("authentication error")
            next(error)
        }
    })
}

export const system_admin_authentication = async (req:Request, res: Response, next: NextFunction) => {
    const result = await wrap ({name: "auth"}, async () => {
        const is_authenticated = await authMockLogic(req) 
        if (is_authenticated) {
            next()
        }else{
            const error = create_error("rute for system management only")
            next(error)        
        }
    })
}

const authMockLogic = async(req:Request):Promise<boolean>=>{
    return true
}