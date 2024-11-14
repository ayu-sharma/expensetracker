import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
function List({ newData, handleDelete, onButtonClick, handleUpdate }) {
  const addSpend = () => {
    onButtonClick();
  };
  return (
    <div className="py-3 bg-white">
      <div className="max-w-sm sm:max-w-md mx-auto">
        <Button
          className="w-full text-center"
          onClick={addSpend}
          text={"Add Spent"}
        />
      </div>
      <div className="max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-10rem)] overflow-scroll p-4 sm:mb-6 sm:max-w-3xl sm:mx-auto mt-10">
        {newData.map((task, index) => (
          <div
            className={`border-2 border-gray-300 px-4 py-3 rounded-md w-full`}
            key={index}
          >
            <div className="grid grid-cols-5 w-full">
            <div className="flex flex-col w-full max-w-lg col-span-3">
              <div className="text-xl leading-5 font-xs sm:font-medium tracking-tight sm:tracking-normal first-letter">
                {task.category}
              </div>
              <div className="text-[#91919F] text-xs leading-4 tracking-tight whitespace-normal w-[12rem]">
                {task.description}
              </div>
            </div>
            <div
              className={`text-xl font-semibold text-[#4C4C4C] leading-4 font-xs sm:font-medium tracking-tight sm:tracking-normal`}
            >
              -{task.currencySymbol} {task.amount}
            </div>
            <div className="flex items-center justify-between px-6">
              <button className="" onClick={() => handleDelete(task._id)}>
                <Trash2 />
              </button>
              <button className="" onClick={() => handleUpdate(task._id)}>
                <Pencil />
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
