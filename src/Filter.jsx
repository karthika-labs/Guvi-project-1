import { useFormik } from "formik";
import { useContext } from "react";
import ApiContext from "./ApiContext";

function Filter() {
  const predefinedCategories = ["Food", "Travel", "Bills", "Others"];
  const { data, setFilteredData } = useContext(ApiContext);

  const formik = useFormik({
    initialValues: {
      Category: [],
      fromDate: "",
      toDate: "",
      min: "",
      max: "",
    },
    onSubmit: (values) => {
      handleFilter(values);
    },
  });

  const handleCategory = (e) => {
    const { value, checked } = e.target;
    const newCategories = checked
      ? [...formik.values.Category, value]
      : formik.values.Category.filter((c) => c !== value);
    formik.setFieldValue("Category", newCategories);
  };

  const handleFilter = (values) => {
    let tempData = [...data];

 
      // Category filter
      if (values.Category.length > 0) {
        if (values.Category.includes("All")) {
          tempData = [...data];
        } else {
          tempData = tempData.filter((item) => {
            const normalizedCategory = predefinedCategories.includes(
              item.Category
            )
              ? item.Category
              : "Others";
            return values.Category.includes(normalizedCategory);
          });
        }
      }

      // Date filter
      if (values.fromDate) {
        tempData = tempData.filter(
          (item) => new Date(values.fromDate) <= new Date(item.Date)
        );
      }
      if (values.toDate) {
        tempData = tempData.filter(
          (item) => new Date(values.toDate) >= new Date(item.Date)
        );
      }

      // Amount filter
      if (values.min) {
        tempData = tempData.filter(
          (item) => item.amount >= parseFloat(values.min)
        );
      }
      if (values.max) {
        tempData = tempData.filter(
          (item) => item.amount <= parseFloat(values.max)
        );
      }

     if (tempData.length === 0) {
    setFilteredData([]); 
  } else {
    setFilteredData(tempData);
  }
   
  };

  const categoryColors = {
    Food: "bg-green-400",
    Travel: "bg-blue-400",
    Bills: "bg-yellow-400",
    Others: "bg-purple-400",
    All: "bg-gray-300",
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-6 max-w-xl mx-auto border border-blue-200"
    >
      {/* Category */}
      <div>
        <label className="font-semibold text-gray-700 mb-2 block">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {["All", ...predefinedCategories].map((cat) => (
            <label
              key={cat}
              className={`flex items-center gap-2 cursor-pointer rounded-full px-3 py-1 text-white text-sm ${
                categoryColors[cat] || "bg-gray-400"
              } transition-all hover:scale-105`}
            >
              <input
                type="checkbox"
                name="Category"
                value={cat}
                onChange={handleCategory}
                checked={formik.values.Category.includes(cat)}
                className="accent-white"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="font-semibold text-gray-700 mb-2 block">
          Date Range
        </label>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">From</span>
            <input
              type="date"
              name="fromDate"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              className="border px-3 py-1 rounded focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">To</span>
            <input
              type="date"
              name="toDate"
              value={formik.values.toDate}
              onChange={formik.handleChange}
              className="border px-3 py-1 rounded focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Amount Range */}
      <div>
        <label className="font-semibold text-gray-700 mb-2 block">
          Amount Range
        </label>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Min</span>
            <input
              type="number"
              name="min"
              value={formik.values.min}
              onChange={formik.handleChange}
              className="border px-3 py-1 rounded w-24 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Max</span>
            <input
              type="number"
              name="max"
              value={formik.values.max}
              onChange={formik.handleChange}
              className="border px-3 py-1 rounded w-24 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="text-right flex justify-between">
        <input
          type="submit"
          value="Apply Filter"
          className="bg-gradient-to-r from-teal-400 to-cyan-500  hover:from-cyan-500 hover:to-teal-400
               text-white font-semibold px-6 py-2 rounded-full shadow-lg 
               transition-all duration-300 transform hover:scale-105 cursor-pointer"
        />
        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="bg-gray-300  cursor-pointer text-white px-3 py-1 transition duration-300 hover:scale-105 rounded flex items-center gap-1"
        >
          <span className="transition duration-300 hover:scale-120">🗑️</span>
        </button>
      </div>
    </form>
  );
}

export default Filter;
