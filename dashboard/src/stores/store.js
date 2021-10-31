import { configureStore } from "@reduxjs/toolkit";
import { metricsApi } from "../features/metricSlice";

export const store = configureStore({
  reducer: {
    [metricsApi.reducerPath]: metricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metricsApi.middleware),
});
