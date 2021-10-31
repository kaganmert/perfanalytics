import { Document, Model, model, Query, Schema } from "mongoose";

export interface MetricDocuments extends Document {
  URL: string;
  TTFB: string;
  FCP: string;
  DomLoad: string;
  WindowLoad: string;
  Timestamp: string;
}

const metricSchema: Schema = new Schema({
  URL: {
    type: String,
    required: true,
  },
  TTFB: {
    type: Number,
    required: true,
  },
  FCP: {
    type: Number,
    required: true,
  },
  DomLoad: {
    type: Number,
    required: true,
  },
  WindowLoad: {
    type: Number,
    required: true,
  },
  Files: {
    type: [
      {
        type: {
          type: String,
          required: true,
        },
        source: {
          type: String,
          required: true,
        },
        responseTime: {
          type: Number,
          required: true,
        },
        executionTime: {
          type: Number,
          required: true,
        },
        fetchTime: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  Timestamp: {
    type: String,
    required: true,
  },
});

interface MetricDocumentsQueryHelpers {
  byTimeInterval(
    startDate: string,
    endDate: string
  ): Query<any, Document<MetricDocuments>> & MetricDocumentsQueryHelpers;
}
metricSchema.query.byTimeInterval = function (
  startDate,
  endDate
): Query<any, Document<MetricDocuments>> & MetricDocumentsQueryHelpers {
  return this.find({
    Timestamp: {
      $gte: startDate,
      $lte: endDate,
    },
  }).sort("Timestamp");
};

const Metric = model<
  MetricDocuments,
  Model<MetricDocuments, MetricDocumentsQueryHelpers>
>("Metric", metricSchema, "metrics");

export default Metric;
