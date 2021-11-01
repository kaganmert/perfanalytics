import React from "react";
import AnalyticsCard from "./cards/AnalyticsCard";
import { useGetMetricsQuery } from "../features/metricSlice";
import { ItemLoader, ItemError } from "../utils/globalStyles";
import NotFoundWarning from "./warnings/NotFoundWarning";

function Analytics() {
  const intervalOptions = [
    { label: "Off", value: 0 },
    { label: "3s", value: 3000 },
    { label: "5s", value: 5000 },
    { label: "10s", value: 10000 },
    { label: "1m", value: 60000 },
  ];
  const a = 1;
  const [pollingInterval, setPollingInterval] = React.useState(0);

  const { data, error, isLoading, isFetching, refetch } = useGetMetricsQuery(
    a,
    {
      pollingInterval,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  if (error) return <ItemError />;
  if (isLoading) return <ItemLoader />;
  if (data.data.length > 0) {
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
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center mb-2">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <h1
                    className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                    data-aos="zoom-y-out"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-700">
                      PerfAnalytics
                    </span>
                  </h1>
                </div>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <div>
                    <p className="font-semibold text-gray-800 ">
                      Polling interval
                    </p>
                    <select
                      value={pollingInterval}
                      onChange={({ target: { value } }) =>
                        setPollingInterval(Number(value))
                      }
                    >
                      {intervalOptions.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    className="hidden md:block w-px h-24 bg-gray-600 ml-8 mr-8"
                    aria-hidden="true"
                  ></div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      onClick={refetch}
                      disabled={isFetching}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isFetching ? (
                        <div className="flex">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <label> Fetching </label>
                        </div>
                      ) : (
                        <p>Manually refetch</p>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <AnalyticsCard
                  chartType="TTFB"
                  res={dataTTFB}
                  timeStamp={timeStamp}
                />
                <AnalyticsCard
                  chartType="FCP"
                  res={dataFCP}
                  timeStamp={timeStamp}
                />
                <AnalyticsCard
                  chartType="DOMLoad"
                  res={dataDomLoad}
                  timeStamp={timeStamp}
                />
                <AnalyticsCard
                  chartType="WindowLoad"
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
