

import { useContext } from "react";
import { ApiContext } from "./ApiContext";
import Add from "./Add";
import View from "./View";
import axios from "axios";

function App() {
  const { data, setData, filteredData, setFilteredData } =
    useContext(ApiContext);

  const handleAdd = async (value) => {
    try {
      const response = await axios.post(
        "https://68ce7f436dc3f350777f2e0c.mockapi.io/Expenses",
        value
      );
      const addData = [...data, response.data];
      setData(addData);
      setFilteredData(addData);
      localStorage.setItem("entries", JSON.stringify(addData));
    } catch (error) {
      console.log("Error adding data:", error);
    }
  };
//  bg-[#f0f4f8]
  
  return (
    <div className="w-full min-h-screen  bg-blue-900  p-6 righteous-regular">
      <div className=" mx-auto  flex flex-col gap-6 px-4 lg:px-0">
        <div className="bg-white rounded-xl shadow p-4 ">
        <h1 className="flex items-center font-bold text-white justify-center text-xl gap-4 rounded bg-gradient-to-r from-blue-500 via-purple-600 to-blue-300  text-2xl font-[700] text-[#333399]">
          <img src="logo.png" className="w-8 h-8 aspect-square rounded-full"></img>
          <span>Smart Expense 📈</span>
        </h1>
        </div>

        {/* Top Row: Add Form + Charts */}
        <div className="">
          <div className="flex flex-col   md:flex-row gap-6">
            {/* Left Column: Add Form */}
            <div className={data.length > 0 ? "md:w-1/3 flex " : " w-full   flex"}>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center flex-1">
                <Add handleAdd={handleAdd} />
              </div>
            </div>

            {/* Right Column: Charts only */}
            {data.length > 0 && (
              <div className="md:w-2/3 flex">
              <div className="bg-white rounded-xl shadow p-4 w-full flex-1 ">
                <View showOnly="charts" /> {/* Only charts */}
              </div>
               </div>
            )}
          </div>

          {/* Bottom Row: Totals + Table / entries list */}
          {data.length > 0 && (
            <div className="bg-white rounded-xl shadow p-4 mt-6">
              <View showOnly="table" /> {/* Totals + Filter + Sort + Table */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
