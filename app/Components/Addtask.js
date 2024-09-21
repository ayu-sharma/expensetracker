"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import saveExpense from "../api/airtable-api";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


function AddTask({setIsUpdating, setSelectedTaskId, onButtonClick, handleDelete, selectedData, setActive, data, setData, isUpdating, selectedTaskId }) {


  function inputChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data);
  }

  const backButton = () => {
    // console.log('...')
    setActive(false)
    setData({
      currencySymbol: "₹",
      amount: null,
      category: "Category",
      description: "",
    });
  }

  async function saveChange() {
    if (isUpdating) {
      if (data.amount !== selectedData.amount || data.category !== selectedData.category || data.currencySymbol !== selectedData.currencySymbol || data.description !== selectedData.description) {
        // console.log("this is selecteddata", selectedData);
        // console.log("this is data", data)
        // console.log("this is deleted", handleDelete)
        await handleDelete(selectedTaskId)
        await saveExpense(parseInt(data.amount), data.category, data.description, data.currencySymbol)
      }
    }
    else {
      await saveExpense(parseInt(data.amount), data.category, data.description, data.currencySymbol)
    }
    onButtonClick();
    setData({
      currencySymbol: "₹",
      amount: null,
      category: "Category",
      description: ""
    });
    setIsUpdating(false)
    setSelectedTaskId(null)
  }


  return (
    <div className="bg-gradient-to-b from-[#4A00E0] to-[#8E2DE2] min-h-screen">
      <div className="pt-3 pb-4">
        <Image
          className="absolute left-2 stroke[20px] cursor-pointer sm:hidden"
          src="/back-arrow(white).svg"
          width={20}
          height={20}
          onClick={backButton}
        />
        <p className="text-center font-semibold text-white leading-5 text-lg sm:hidden">
          Add your spend
        </p>
      </div>

      <div className="fixed bottom-0 w-full sm:static sm:flex sm:flex-col sm:item-center sm:justify-center sm:max-w-lg sm:mx-auto sm:bg-slate-50 sm:rounded-3xl sm:pt-5">
        <div
          className="px-4 stroke[20px] hidden sm:block"
          onClick={backButton}
        >
          < MdOutlineKeyboardBackspace className=" hover:opacity-[50%] cursor-pointer" />
        </div>

        <div className="px-4 py-3">
          <p className="text-[#FCFCFC] sm:text-black font-semibold leading-5 text-lg sm:text-2xl">
            How much did you spend
          </p>

          {/* Amount */}
          <div className="flex items-center pt-3 sm:pt-4 sm:justify-center">
            {/* Amount denotation */}
            <div className="pr-1 font-semibold text-white sm:text-black leading-5 text-xl sm:text-3xl">
              <form>
                <select
                  className=" py-4 rounded-2xl w-full border-2"
                  name="currencySymbol"
                  id="currencySymbol"
                  autoComplete="off"
                  value={data.currencySymbol}
                  onChange={inputChange}
                  style={{ background: "none", outline: "none", border: "none" }}
                >
                  <option value="₹">₹</option>
                  <option value="€">€</option>
                  <option value="£">£</option>
                  <option value="$">$</option>
                  <option value="K">K</option>
                </select>
              </form>
            </div>
            <form>
              <input
                className="font-semibold text-white sm:text-black leading-5 text-xl bg-transparent border-none rounded sm:text-3xl "
                name="amount"
                id="amount"
                type="number"
                placeholder="0"
                autoComplete="off"
                value={data.amount}
                onChange={inputChange}
                style={{ background: "none", outline: "none", border: "none", width: "100px" }}
              />
            </form>
          </div>
        </div>

        {/* div for category, description, and save button */}
        <div className="flex flex-col items-stretch mt-5 sm:mt-0 py-6 bg-slate-50 gap-4 px-4 rounded-t-3xl sm:rounded-3xl">
          {/* Category */}
          <form>
            <select
              className="px-3 py-4 rounded-2xl w-full border-2"
              name="category"
              id="category"
              autoComplete="off"
              value={data.category}
              onChange={inputChange}
            >
              <option value="Category" disabled>
                Category
              </option>
              <option value="Shopping">Housing</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Insurance">Insurance </option>
              <option value="Saving, Investing, & Debt Payments">
                Saving, Investing, & Debt Payments{" "}
              </option>
              <option value="Medical & Healthcare">Medical & Healthcare</option>
              <option value="Personal Spending">Personal Spending</option>
            </select>
          </form>

          {/* Description */}
          <form>
            <input
              className="px-3 py-4 rounded-2xl w-full border-2"
              name="description"
              id="description"
              type="text"
              placeholder="Describe where you spent"
              autoComplete="off"
              value={data.description}
              onChange={inputChange}
            />
          </form>

          {/* Save Button */}
          <div className="">
            <Button
              className={`w-full ${data.amount === "" || data.category === "Category" ? "opacity-[50%]" : "opacity-[100%]"}`}
              onClick={saveChange}
              disabled={data.amount === "" || data.category === "Category"}
              text={isUpdating ? "Update" : "Save"} // Dynamically change text
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
