import React from "react";
import AnalyticsCard from "./cards/AnalyticsCard";
import { useGetMetricsQuery } from "../features/metricSlice";
import { ItemLoader, ItemError } from "../utils/globalStyles";
import NotFoundWarning from "./warnings/NotFoundWarning";

function Analytics() {
  const { data, error, isLoading } = useGetMetricsQuery();
  if (error) return <ItemError />;
  if (isLoading) return <ItemLoader />;
  if (data.data.length > 0) {
    console.log(data.data);
    const dataTTFB = [];
    const dataFCP = [];
    const dataDomLoad = [];
    const dataWindowLoad = [];
    const timeStamp = [];
    // eslint-disable-next-line array-callback-return
    data.data.map((key) => {
      dataTTFB.push(key.TTFB);
      dataFCP.push(key.FCP);
      dataDomLoad.push(key.DomLoad);
      dataWindowLoad.push(key.WindowLoad);
      timeStamp.push(key.Timestamp.substring(11, 19));
    });
    console.log(dataTTFB);
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center mb-2">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <AnalyticsCard
                  chartType="TTFB Chart"
                  res={dataTTFB}
                  timeStamp={timeStamp}
                />
                <AnalyticsCard
                  chartType="FCP Chart"
                  res={dataFCP}
                  timeStamp={timeStamp}
                />
                <AnalyticsCard
                  chartType="DOM Load Chart"
                  res={dataDomLoad}
                  timeStamp={timeStamp}
                />
                <AnalyticsCard
                  chartType="Window Load Chart"
                  res={dataWindowLoad}
                  timeStamp={timeStamp}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  return <NotFoundWarning />;
}

export default Analytics;
