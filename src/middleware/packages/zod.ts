import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodRawShape, ZodTypeAny, ZodObject } from "zod";


export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };





