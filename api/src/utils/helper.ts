import { Request, Response } from "express";
import { connect } from "mongoose";
import { logger } from "./logger";

export const dbConnection = async (MONGODB_URI: string) => {
  try {
    await connect(MONGODB_URI);
    console.log("Database successfully connected. ✅ ");
  } catch (error) {
    if (error instanceof Error) {
      let errorMessage = error.message;
      console.log("Database connection failed. Because", errorMessage, "❎");
    }
    process.exit(1);
  }
};

export const dateRangeCalculator = (req: Request, res: Response) => {
  let startDate, endDate;
  if (req.query.startDate && req.query.endDate) {
    startDate = req.query.startDate as string;
    endDate = req.query.endDate as string;
    return { startDate, endDate };
    //TO-DO !startDate-!endDate yoksa durumu ya da / ve / bağlaçlarıyla
  } else {
    logger.log({
      message: `Bad Request: Time format is wrong. `,
      level: "error",
    });
    return handleError(res, {
      code: 400,
      message: "Time format is wrong.",
    });
  }
};

export const handleError = (res: Response, err: any) => {
  logger.log({
    message: `Internal Server Error: ${err.code}- ${err.message} `,
    level: "error",
  });
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
};
