import React from "react";
import LineChart from "../charts/LineChart";
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

export default function AnalyticsCard(props) {
  const averageValue = (
    props.res.reduce((a, b) => a + b, 0) / props.res.length
  ).toFixed(5);
  const chartData = {
    labels: props.timeStamp,
    datasets: [
      {
        label: "Current",
        data: props.res,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
      },
    ],
  };
  return (
    <div className="flex flex-col col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <div
          className="relative flex items-center justify-center w-4 h-4 rounded-full bg-red-100 mr-3"
          aria-hidden="true"
        >
          <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500"></div>
        </div>
        <h2 className="font-semibold text-gray-800 mr-2">{props.chartType}</h2>
        <div
          className="hidden md:block w-px h-8 bg-gray-200 ml-3"
          aria-hidden="true"
        ></div>
        <div className="ml-4">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-800 mr-2">
              {averageValue}
            </div>
            {averageValue < 0.015 ? <GoodValueTag /> : <BadValueTag />}
          </div>
          <div className="text-sm text-gray-500">Average Value</div>
        </div>
      </header>

      {/* Chart built with Chart.js 3 */}
      <div className="flex-grow">
        <LineChart data={chartData} width={800} height={300} />
      </div>
    </div>
  );
}

const GoodValueTag = () => {
  return (
    <div>
      <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};

const BadValueTag = () => {
  return (
    <div>
      <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};
