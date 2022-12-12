import { NextFunction, Request, Response } from "express";
import { wrapSync } from "../../utilities/function_wrapping";

export const health_check = (req:Request, res: Response, next: NextFunction) => {
wrapSync ({name: "health_check"}, () => {
    res.status(200).send('Ok')
})}
