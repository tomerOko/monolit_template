import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodRawShape, ZodTypeAny, ZodObject } from "zod";
import { create_error } from "../../errors/error_factory";


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
      const structued_error = create_error("bad request properties error", error)
      return next(structued_error)
    }
  };





