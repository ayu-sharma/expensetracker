import React, { useEffect, useState  } from "react";
import Button from "./Button";
import axios from "axios";
// import { IoMdArrowDropdownCircle } from "react-icons/io";
// import { IoIosArrowDropdownCircle } from "react-icons/io";
import { RiDropdownList } from "react-icons/ri";
import { delteFromApi } from "../api/airtable-api";
import {updateRecord} from "../api/airtable-api";

function List(props) {
const [open, setIsOpen] = useState("false")

  const addSpend = () => {
    // console.log("hello");
    props.onButtonClick();
  };
  
  const handleButtonClick = () => {
    setActive(!active);
  };
 

  const handleDelete = async (recordId) => {
    
    try {
      console.log("Deleting record with ID:", recordId)
      const response = await delteFromApi(recordId); 
      // console.log("delete api result", response.data); 
      const updatedData = props.newData.filter(task => task.id !== recordId);
      props.setNewData(updatedData);
      // console.log("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      // console.log("there are there records", recordId)
       
    }
  };
 console.log("this is new data", props.newData)

  const handleUpdate = async(recordId)=> {
    try {
      const response = await updateRecord(recordId);
      console.log(response);
    } catch (error) {
      console.error("Error updating record:", error);
      console.log(recordId)
    }}
    // console.log(handleUpdate.error)
   


  return(
    <div className="py-3 bg-white">
      <div className="max-w-sm sm:max-w-md mx-auto">
        <Button className="w-full text-center" onClick={addSpend} text={"Add Spent"}/>  
        </div>        
     <div className="max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-10rem)] overflow-scroll p-4 sm:mb-6 sm:max-w-2xl sm:mx-auto mt-10">
    {props.newData.map((task,index) => (
      <div
        className={`px-3 py-4 mx-3 rounded-lg outline-slate-100/70 outline outline-offset-2 outline-4 my-4 font-medium text-base grid grid-cols-5 gap-4  ${task.fields.description ? "" : "justify-self-center"}`}
        key={index}
      >
          <div className="flex flex-col col-span-3 ">
          <div className="text-xl leading-5 font-xs sm:font-medium tracking-tight sm:tracking-normal col-span-2 first-letter">
            {task.fields.category}
          </div>

          <div className="text-[#91919F] text-xs leading-4 font-xs sm:font-medium tracking-tight sm:tracking-normal col-span-2">{task.fields.description}</div>
          </div>
        <div
          className={`text-xl font-semibold text-[#4C4C4C] leading-4 font-xs sm:font-medium tracking-tight sm:tracking-normal`}
        > 
          -{task.fields.currencySymbol} {task.fields.amount}
        </div>
        {/* <button className="bg-slate-600" onClick={handleDelete}>v</button> */}
       <button className="" onClick={()=>handleDelete(task.id)} >Delete</button>
       <button className="" onClick={()=>handleUpdate(task.id)} >Update</button>
       {/* {console.log(props.)} */}
       {/* {console.log(task.id)} */}
      </div>
    ))}
   
  </div>
  </div>
  );
}

export default List;