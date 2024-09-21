"use client";
import React, { useState } from "react";
import AddTask from "./Components/Addtask";
import List from "./Components/List";
import { useEffect } from "react";
import { addFromApi } from "./api/airtable-api";
import { delteFromApi } from "./api/airtable-api";


function App() {
  const [newData, setNewData] = useState([]);
  const [active, setActive] = useState(false);
  const [data, setData] = useState({
    currencySymbol: "₹",
    amount: null,
    category: "Category",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const [selectedTaskId, setSelectedTaskId] = useState()

  const handleButtonClick = () => {
    setActive(!active);
  };



  const getData = async () => {
    const resp = await addFromApi()
    // console.log("this is response", resp)
    setNewData(resp.data)
  }
  const handleUpdate = (recordId) => {
    const selectedData = newData.find(record => record._id === recordId);
    setSelectedData(selectedData)
    setIsUpdating(true)
    setSelectedTaskId(recordId)
    handleButtonClick()
    // console.log("selected data", selectedData)

    setData(
      {
        amount: selectedData.amount || "",
        category: selectedData.category || "Category",
        description: selectedData.description || "",
        currencySymbol: selectedData.currencySymbol || "",
      }
    )
  }
  const handleDelete = async (taskId) => {
    try {
      // console.log("Deleting record with ID:", taskId);
      const response = await delteFromApi(taskId);
      // console.log("delete api result", response);
      const updatedData = newData.filter(task => task._id !== taskId);
      setNewData(updatedData);
    } catch (error) {
      // console.error("Error deleting record:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [active])
  return (
    <div className=" min-h-screen">
      {active ? (
        <AddTask
          newData={newData}
          setNewData={setNewData}
          onButtonClick={handleButtonClick}
          active={active}
          setActive={setActive}
          getData={getData}
          data={data}
          setData={setData}
          isUpdating={isUpdating}
          handleDelete={handleDelete}
          selectedData={selectedData}
          selectedTaskId={selectedTaskId}
          setIsUpdating={setIsUpdating}
          setSelectedTaskId={setSelectedTaskId}
        />
      ) : (
        <div className="">
          <List
            newData={newData}
            setNewData={setNewData}
            onButtonClick={handleButtonClick}
            active={active}
            setActive={setActive}
            data={data}
            setData={setData}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default App;
