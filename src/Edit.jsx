






import { useContext, useState } from "react";
import { ApiContext } from "./ApiContext";
import axios from "axios";
import Delete from "./Delete";
import { FaEdit } from "react-icons/fa";
import { FaUtensils, FaPlane, FaFileInvoiceDollar, FaRegStar } from "react-icons/fa";
import { useFormik } from "formik";

function Edit({ updateData }) {
  const { data, setData, filteredData, setFilteredData } = useContext(ApiContext);
  const [isEditing, setIsEditing] = useState(false);

  const predefinedCategories = ["Food", "Travel", "Bills", "Others"];

  const categoryIcons = {
    Food: <FaUtensils className="text-white" />,
    Travel: <FaPlane className="text-white" />,
    Bills: <FaFileInvoiceDollar className="text-white" />,
    Others: <FaRegStar className="text-white" />,
  };

  const categoryColors = {
    Food: "bg-green-500",
    Travel: "bg-blue-500",
    Bills: "bg-yellow-500",
    Others: "bg-purple-500",
  };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: updateData.amount,
      Category: updateData.Category,
      Notes: updateData.Notes,
      Date: updateData.Date,
    },
    onSubmit: () => {}, 
  });

  const displayCategory = predefinedCategories.includes(formik.values.Category)
  ? formik.values.Category
  : "Others";

  const handleChange = (e) => {
    formik.handleChange(e); 
  };

  const handleSave = async () => {
    
    const normalizedCategoryForDisplay =
      predefinedCategories.find(
        (cat) => cat.toLowerCase() === formik.values.Category.toLowerCase()
      ) || "Others";

    const updatedValues = { ...formik.values, id: updateData.id };

    try {
      const response = await axios.put(
        `https://68ce7f436dc3f350777f2e0c.mockapi.io/Expenses/${updateData.id}`,
        updatedValues
      );
      console.log("successfully updating", response.data);
      const index = data.findIndex((item) => item.id === updateData.id);
      const newData = [...data];
      newData[index] = response.data;
      setData(newData);
      setFilteredData(
        filteredData.map((item) => (item.id === updateData.id ? response.data : item))
      );

      localStorage.setItem("entries", JSON.stringify(newData));
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating", error);
    }
  };

  const handleCancel = () => {
    formik.resetForm(); // revert to initialValues
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-xl p-3 flex   flex-wrap items-center justify-between gap-3 hover:shadow-lg transition">
      {/* Category */}
      <div
        className={`flex flex-1 items-center gap-1 px-1 py-1 rounded-full ${categoryColors[displayCategory] || "bg-gray-400"} min-w-[70px] justify-center`}
      >
        {categoryIcons[displayCategory] || <FaRegStar className="text-white" />}
        {isEditing ? (
          <input
            type="text"
            name="Category"
            value={formik.values.Category}
            onChange={handleChange}
            className="bg-transparent text-white font-bold w-full focus:outline-none text-sm text-center"
          />
        ) : (
          <span className="text-white font-bold text-sm">{formik.values.Category}</span>
        )}
      </div>

      {/* Amount */}
      <div className="flex-1 ">
        {isEditing ? (
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            className="bg-transparent font-semibold text-lg w-full min-w-[30px]  focus:outline-none"
          />
        ) : (
          <p className="font-semibold text-lg">₹{formik.values.amount}</p>
        )}
      </div>

      {/* Notes + Date */}
      <div className="flex-1 flex flex-col items-center">
        {isEditing ? (
          <>
            <input
              type="text"
              name="Notes"
              value={formik.values.Notes}
              onChange={formik.handleChange}
              className="bg-transparent text-gray-500 w-full focus:outline-none text-sm"
            />
            <input
              type="date"
              name="Date"
              value={formik.values.Date}
              onChange={formik.handleChange}
              className="bg-transparent text-gray-400 w-full text-xs focus:outline-none mt-1"
            />
          </>
        ) : (
          <>
            <p className="text-gray-500 text-sm">{formik.values.Notes}</p>
            <p className="text-gray-400 text-xs mt-1">{formik.values.Date}</p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              <FaEdit />
            </button>
            <Delete id={updateData.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default Edit;
