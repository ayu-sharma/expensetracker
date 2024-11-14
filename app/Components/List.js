import React from "react";
import Button from "./Button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Popcorn } from "lucide-react";
import { House } from "lucide-react";
import { UtilityPole } from "lucide-react";
import { Sofa } from "lucide-react";
import { HandCoins } from "lucide-react";
import { Ambulance } from "lucide-react";
import { FileUser } from "lucide-react";

export default function ListCmp({
  newData,
  handleDelete,
  onButtonClick,
  handleUpdate,
}) {
  const addSpend = () => {
    onButtonClick();
  };

  const renderIcon = (category) => {
    switch (category) {
      case "Housing":
        return (
          <div className="text-[#543DFF] bg-[#E5EAFF] p-2 rounded-lg">
            {" "}
            <House size={32} />
          </div>
        );
      case "Saving, Investing, & Debt Payments":
        return (
          <div className="text-[#23AF43] bg-[#D8FDD5] p-2 rounded-lg">
            {" "}
            <HandCoins size={32} />{" "}
          </div>
        );
      case "Medical & Healthcare":
        return (
          <div className="text-[#3CB9FD] bg-[#D5F3FD] p-2 rounded-lg">
            <Ambulance size={32} />
          </div>
        );
      case "Personal Spending":
        return (
          <div className="text-[#FD3CDA] bg-[#FDD5F5] p-2 rounded-lg">
            <FileUser size={32} />
          </div>
        );
      case "Utilities":
        return (
          <div className="text-[#FCAC12] bg-[#FCEED4] p-2 rounded-lg">
            <UtilityPole size={32} />
          </div>
        );
      case "Insurance":
        return (
          <div className="text-[#7F3DFF] bg-[#EEE5FF] p-2 rounded-lg">
            <Sofa size={32} />
          </div>
        );
      case "Food":
        return (
          <div className="text-[#FD3C4A] bg-[#FDD5D7] p-2 rounded-lg">
            <Popcorn size={32} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-evenly bg-[#fafafa] min-h-screen">
      <div className="max-w-sm sm:max-w-md mx-auto w-full px-5">
        <Button
          className="w-full text-center"
          onClick={addSpend}
          text={"Add Spent"}
        />
      </div>
      <div className="max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-8rem)] overflow-scroll flex flex-col gap-4 sm:max-w-xl bg-slate-white px-6 py-5 md:max-w-2xl max-w-md w-full mx-auto">
        {newData.map((task, index) => (
          <>
            <div
              className={`border-2 border-gray-300 px-7 py-6 rounded-md w-full`}
              key={index}
            >
              <div
                className={`grid grid-cols-5 gap-2 ${
                  task.description === "" ? "items-center" : "items-start"
                }`}
              >
                <div className="col-span-3 flex items-center gap-4">
                  <div className="">{renderIcon(task.category)}</div>
                  <div className={`flex flex-col ${task.description === "" ? "gap-0" : "gap-2"}`}>
                    <div className="sm:text-xl text-sm font-medium text-gray-900">
                      {task.category}
                    </div>
                    <div className="text-xs text-gray-500 break-words max-w-[100px] md:max-w-[200px]">
                      {task.description}
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="sm:text-xl text-sm font-semibold text-gray-700 text-right">
                  -{task.currencySymbol} {task.amount}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => handleDelete(task._id)}>
                    <Trash2 className="text-gray-600 w-4 sm:w-full" />
                  </button>
                  <button onClick={() => handleUpdate(task._id)}>
                    <Pencil className="text-gray-600 w-4 sm:w-full" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
