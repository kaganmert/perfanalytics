import moment from "moment";
import { Request, Response } from "express";
import Metric, { MetricDocuments } from "../models/metrics.model";
import { dateRangeCalculator, handleError } from "../utils/helper";
import { logger } from "../utils/logger";
export async function createMetric(req: Request, res: Response) {
  try {
    const { URL, TTFB, FCP, DomLoad, WindowLoad, Files, Timestamp } = req.body;
    const metric = new Metric({
      URL,
      TTFB,
      FCP,
      DomLoad,
      WindowLoad,
      Files,
      Timestamp: moment(Timestamp).toISOString(),
    });
    await metric
      .save()
      .then((result: any) => {
        logger.log({
          message: `CREATED: ${result._id}`,
          level: "info",
        });
        return res.status(201).send({ id: result._id });
      })
      .catch((err) => {
        return handleError(res, err);
      });
    return;
  } catch (err) {
    return handleError(res, err);
  }
}

//----------------------------------------------------------------

export async function getMetric(req: Request, res: Response) {
  try {
    const dateParams: any = dateRangeCalculator(req, res);
    const metrics: object | Array<MetricDocuments> = await Metric.find()
      .byTimeInterval(dateParams.startDate, dateParams.endDate)
      .exec()
      .then((query: object) => {
        return query;
      });
    if (metrics instanceof Array) {
      const data = metrics.map((item: any) => {
        const { _id, URL, TTFB, FCP, DomLoad, WindowLoad, Files, Timestamp } =
          item;
        return {
          id: _id,
          URL,
          TTFB,
          FCP,
          DomLoad,
          WindowLoad,
          Files,
          Timestamp,
        };
      });
      logger.log({
        message: "OK: Query Result Found!",
        level: "info",
      });
      return res.status(200).send({ data });
    }
    return;
  } catch (err) {
    logger.log({
      message: `Error: ${err} `,
      level: "error",
    });
    return handleError(res, err);
  }
}
