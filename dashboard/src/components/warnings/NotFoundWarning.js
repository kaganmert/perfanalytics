import React from "react";
import { Link } from "react-router-dom";
const NotFoundWarning = () => {
  return (
    <div>
      <div className="flex w-full items-center dark:bg-gray-900 py-12 px-6 flex justify-center items-center ">
        <div>
          <div className="max-w-xs h-48 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
            <div>
              <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
                PerfAnalytics 😞
              </h4>
              <p className="text-gray-800 dark:text-gray-100 text-sm">
                Sorry, there was no data from the website in the last half hour.
                Please visit our sample website and try again.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-800">
                <Link
                  to={{
                    pathname: "https://sample.kagan.dev",
                  }}
                  target="_blank"
                >
                  <div className="flex">
                    <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-900 hover:text-indigo-900 rounded border border-indigo-800 text-indigo-800 px-6 py-2 text-xs">
                      <p className="text-md font-bold text-red dark:text-indigo-100">
                        Visit now.
                      </p>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundWarning;
