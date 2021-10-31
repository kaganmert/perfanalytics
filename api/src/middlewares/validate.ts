import { Request, Response } from "express";
import Joi from "joi";
import { logger } from "../utils/logger";
// https://jasonwatmore.com/post/2020/07/22/nodejs-express-api-request-schema-validation-with-joi

export default function validateRequest(
  req: Request,
  res: Response,
  next: Function,
  schema: Joi.ObjectSchema
) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    logger.log({
      message: `Bad Request-Validation Error: ${error} `,
      level: "error",
    });
    res
      .status(400)
      .send(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
  } else {
    req.body = value;
    next();
  }
}
