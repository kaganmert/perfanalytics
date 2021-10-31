import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";

export function Timer() {
  const now = new Date();
  //now.setHours(3); // UTC+3 - Istanbul
  const startDate = moment(now).subtract(30, "minutes").toISOString();
  const endDate = moment(now).toISOString();
  return { data: { startDate: startDate, endDate: endDate } };
}

const baseUrl = `${process.env.REACT_APP_BACKEND_HOST}`;

export const metricsApi = createApi({
  reducerPath: "metricsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Result"],
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () =>
        `/api/v1/metrics?startDate=${Timer().data.startDate}&endDate=${
          Timer().data.endDate
        }`,
      providesTags: (result, error, arg) => [{ type: "Result", id: arg }],
    }),
  }),
});

export const { useGetMetricsQuery } = metricsApi;
