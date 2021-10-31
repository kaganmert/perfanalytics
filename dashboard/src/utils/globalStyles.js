import React from "react";

export const ItemLoader = () => (
  <>
    <div className="bg-white flex space-x-2 p-5 justify-center items-center">
      <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce ring-blue-800" />
      <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce ring-green-800" />
      <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce ring-red-800" />
    </div>
  </>
);

export const ItemError = () => (
  <>
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  </>
);
