"use client";
import React, { useState } from "react";
import AddTask from "./Components/Addtask";
import List from "./Components/List";
import { useEffect } from "react";
import axios from "axios"
import { addFromApi } from "./api/airtable-api";


function App() {
  const [newData, setNewData] = useState([]);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = () => {
    setActive(!active);
  };
 
  

  const getData = async() => {
    // setIsLoading(true)
    const resp = await addFromApi()
    console.log(resp)
    // setIsLoading(false)
    setNewData(resp?.data?.records)
  }
  // if(isLoading) {
  //   return (
  //     <div> Loading</div>
  //   )
  // }

  useEffect(()=>{
    getData();
  },[active])
  return (
    <div className=" min-h-screen">
      {active ? (
        <AddTask 
          newData={newData}
          setNewData={setNewData}
          onButtonClick={handleButtonClick}
          active= {active}
          setActive= {setActive}
          getData= {getData}
        />
      ) : (
        <div className="">
          <List
            newData={newData}
            setNewData={setNewData}
            onButtonClick={handleButtonClick}
          />
        </div>
      )}
    </div>
  );
}

export default App;
