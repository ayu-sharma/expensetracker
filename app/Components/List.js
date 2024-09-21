import React, { useEffect, useState } from "react";
import Button from "./Button";


function List({ newData, handleDelete, onButtonClick, handleUpdate }) {

  const addSpend = () => {
    onButtonClick();
  };



  // console.log("this is new data", newData)


  return (
    <div className="py-3 bg-white">
      <div className="max-w-sm sm:max-w-md mx-auto">
        <Button className="w-full text-center" onClick={addSpend} text={"Add Spent"} />
      </div>
      <div className="max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-10rem)] overflow-scroll p-4 sm:mb-6 sm:max-w-2xl sm:mx-auto mt-10">
        {newData.map((task, index) => (
          <div
            className={`px-3 py-4 mx-3 rounded-lg outline-slate-100/70 outline outline-offset-2 outline-4 my-4 font-medium text-base grid grid-cols-5 gap-4  ${task.description ? "" : "justify-self-center"}`}
            key={index}
          >
            <div className="flex flex-col col-span-3 ">
              <div className="text-xl leading-5 font-xs sm:font-medium tracking-tight sm:tracking-normal col-span-2 first-letter">
                {task.category}
              </div>

              <div className="text-[#91919F] text-xs leading-4 font-xs sm:font-medium tracking-tight sm:tracking-normal col-span-2">{task.description}</div>
            </div>
            <div
              className={`text-xl font-semibold text-[#4C4C4C] leading-4 font-xs sm:font-medium tracking-tight sm:tracking-normal`}
            >
              -{task.currencySymbol} {task.amount}
            </div>
            <button className="" onClick={() => handleDelete(task._id)} >Delete</button>
            <button className="" onClick={() => handleUpdate(task._id)} >Update</button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default List;