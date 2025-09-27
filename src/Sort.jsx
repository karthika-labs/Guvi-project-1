import { useFormik } from "formik";
import { useContext } from "react";
import ApiContext from "./ApiContext";

function Sort() {
  const { data, setFilteredData ,sortBy,setSortBy} = useContext(ApiContext);

  const formik = useFormik({
    initialValues: {
      sortBy: ""
    },
    onSubmit: (values) => {
      handleSort(values);
    }
  });

  const handleSort = (values) => {
    let sortedData = [...data]; // copy to avoid mutating original

    if (values.sortBy === "By Date") {
      // Bubble sort by Date (recent first)
      for (let i = 0; i < sortedData.length - 1; i++) {
        for (let j = 0; j < sortedData.length - 1 - i; j++) {
          if (new Date(sortedData[j].Date) < new Date(sortedData[j + 1].Date)) {
            let temp = sortedData[j];
            sortedData[j] = sortedData[j + 1];
            sortedData[j + 1] = temp;
          }
        }
      }
    }

    if (values.sortBy === "By Amount") {
      // Bubble sort by Amount (largest first)
      for (let i = 0; i < sortedData.length - 1; i++) {
        for (let j = 0; j < sortedData.length - 1 - i; j++) {
          if (sortedData[j].amount < sortedData[j + 1].amount) {
            let temp = sortedData[j];
            sortedData[j] = sortedData[j + 1];
            sortedData[j + 1] = temp;
          }
        }
      }
    }

    
   
    setFilteredData(sortedData);
    setSortBy(values.sortBy);
    
  localStorage.setItem("entries", JSON.stringify(sortedData));
  };

  return (
    <form onChange={formik.handleSubmit} className="w-full">
      <select
        name="sortBy"
        value={formik.values.sortBy}
        onChange={formik.handleChange}
       className="border bg-white border-blue-500 text-blue-700 px-3 py-1 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      >
      
        <option value="By Date" className="flex items-center gap-2 " >▼  By Date📅</option>
        <option value="By Amount" className="flex items-center gap-2">💰 By Amount</option>
      
      </select>
    </form>
  );
}

export default Sort;
