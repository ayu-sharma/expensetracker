"use client";
import React, { useState } from "react";
import AddTask from "./Components/Addtask";
import ListCmp from "./Components/List";
import { useEffect } from "react";
import { addFromApi } from "./api/airtable-api";
import { delteFromApi } from "./api/airtable-api";
import Spinner from "./Components/Spinner";

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
  const [loading, setLoading] = useState(false)
  const handleButtonClick = () => {
    setActive(!active);
  };



  const getData = async () => {
    setLoading(true)
    const resp = await addFromApi()
    setNewData(resp.data)
    setLoading(false)
  }
  console.log("this is loading",loading)
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
    <div className="min-h-screen">
      {loading ? (
        <Spinner />
      ) : active ? (
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
        <ListCmp
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
      )}
    </div>
    
  );
}

export default App;
