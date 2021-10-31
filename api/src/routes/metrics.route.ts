import { Router } from "express";
import { createMetric, getMetric } from "../controllers/metrics.controller";
import { validate } from "../validations/metrics";

export const defaultRouter = (app: Router) => {
  app.get("/api/v1/metrics", getMetric);
  app.post("/api/v1/metrics", validate, createMetric);
};
