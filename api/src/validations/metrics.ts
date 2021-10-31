import validateRequest from "../middlewares/validate";
import { Request, Response } from "express";
import Joi from "joi";

export function validate(req: Request, res: Response, next: Function) {
  const schema = Joi.object({
    URL: Joi.string().uri().required(),
    TTFB: Joi.number(),
    FCP: Joi.number(),
    DomLoad: Joi.number(),
    WindowLoad: Joi.number(),
    Files: Joi.array(),
    Timestamp: Joi.string().isoDate().required(),
  });
  validateRequest(req, res, next, schema);
}
