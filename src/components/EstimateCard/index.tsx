import React from "react";

interface EstimateCardParams {
  description: string;
  stack: string[];
  devs: number;
  time: number;
}

export const EstimativeCard = ({
  description,
  stack,
  devs,
  time,
}: EstimateCardParams) => {
  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-left">
      <h5 className="mb-2 w-60 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {description}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
        tech: {stack.toString()}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
        time (days): {time}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
        devs: {devs}
      </p>
    </div>
  );
};
