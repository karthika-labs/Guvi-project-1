

import { useState, useContext, useEffect } from "react";
import { ApiContext } from "./ApiContext";
import Edit from "./Edit";
import Filter from "./Filter";
import Sort from "./Sort";
import ChartCategory from "./ChartCategory";
import { FaFilter } from "react-icons/fa";

import {
  FaUtensils,
  FaPlane,
  FaFileInvoiceDollar,
  FaRegStar,
} from "react-icons/fa";

function View({ showOnly }) {
  const { filteredData, sortBy } = useContext(ApiContext);
  const [filterVisible, setFilterVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPerCategory, setTotalPerCategory] = useState({});

  const categoryIcons = {
    Food: <FaUtensils className="text-white text-xl" />,
    Travel: <FaPlane className="text-white text-xl" />,
    Bills: <FaFileInvoiceDollar className="text-white text-xl" />,
    Others: <FaRegStar className="text-white text-xl" />,
  };

  const gradientColors = {
    Food: "from-green-400 to-green-600",
    Travel: "from-blue-400 to-blue-600",
    Bills: "from-yellow-400 to-yellow-600",
    Others: "from-purple-400 to-purple-600",
  };

  // Calculate totals and per-category totals
  useEffect(() => {
    const sum = filteredData.reduce(
      (acc, item) => acc + parseInt(item.amount),
      0
    );
    setTotal(sum);

    const categoryTotals = filteredData.reduce((acc, item) => {
      const cat = item.Category || "Others";
      if (!acc[cat]) acc[cat] = 0;
      acc[cat] += parseInt(item.amount);
      return acc;
    }, {});
    setTotalPerCategory(categoryTotals);
  }, [filteredData]);

  // Group data by date
  const groupByDate = (dataArray) => {
    const grouped = {};
    dataArray.forEach((item) => {
      const date = item.Date;
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    const dates = Object.keys(grouped);
    if (!sortBy || sortBy === "By Date") {
      dates.sort((a, b) => new Date(b) - new Date(a));
    }
    return dates.map((date) => ({ date, items: grouped[date] }));
  };

  const groupedData = groupByDate(filteredData);

 
  if (showOnly === "charts") {
    return (
      <div className="flex items-center  flex-wrap justify-center gap-4">
        <ChartCategory totalPerCategory={totalPerCategory} />
      </div>
    );
  }

 

  return (
    <>
      
        <div className="space-y-6 p-4">
          {/* Totals */}

   
         <div className="space-y-6">
            <div className="flex  items-center font-bold text-white justify-center text-xl rounded bg-gradient-to-r from-blue-500 via-purple-600 to-blue-300">
              QuickStats
            </div>
           {total<=0 ?<div className="flex items-center justify-center">No expenses total found for this filter. </div>:( <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-gray-800 text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-4 min-w-[150px]">
                <p className="text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold">₹{total}</p>
              </div>
              {Object.keys(totalPerCategory).map((cat) => (
                <div
                  key={cat}
                  className={`bg-gradient-to-r ${gradientColors[cat]} text-white rounded-xl shadow-lg flex items-center p-4 min-w-[150px] gap-3`}
                >
                  <div className="p-3 bg-white/20 rounded-full">
                    {categoryIcons[cat]}
                  </div>
                  <div>
                    <p className="text-sm">{cat}</p>
                    <p className="font-bold text-lg">
                      ₹{totalPerCategory[cat]}
                    </p>
                  </div>
                </div>
              ))}
            </div>)}
          </div>

          {/* Filter & Sort */}
          <div className="space-y-4">
            {/* Title */}
            <div className="flex items-center font-bold text-white justify-center text-xl rounded bg-gradient-to-r from-blue-500 via-purple-600 to-blue-300">
              Filter & Sort 🔎
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start my-6 px-2 md:px-0 gap-4">
              {/* Filter - left side */}

              {filterVisible && (
                <div className="grow">
                  <Filter />
                </div>
              )}

              {/* Sort + Toggle Button - right side */}

              <div className="flex items-center gap-3 md:ml-auto">
                <Sort />
                <button
                  onClick={() => setFilterVisible(!filterVisible)}
                  className="bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-indigo-600 hover:to-blue-400
             text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300
             flex items-center gap-2 font-semibold text-sm w-full"
                >
                  <FaFilter />
                  {filterVisible ? "Hide Filter" : "Filter"}
                </button>
              </div>
            </div>
          </div>

          {/* Table / Entries */}
          <div className="space-y-6">
             <div className="flex items-center justify-center font-bold text-white text-xl rounded bg-gradient-to-r from-blue-500 via-purple-600 to-blue-300 ">
            Expenses 📋
          </div>
            {groupedData.length === 0
              ? <div className="flex items-center justify-center">NO Matches found</div>
              : 
              (
                <div className="space-y-6">
         
               { groupedData.map((group) => (
                  <div key={group.date}>
                    <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 w-max font-semibold mb-3">
                      {group.date}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                      {group.items.map((item) => (
                        <Edit key={item.id} updateData={item} />
                      ))}
                    </div>
                  </div>
                ))}
                </div>
                
              )
                
                }
          </div>
        </div>
     
    </>
  );
}

export default View;
