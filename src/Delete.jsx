



import { useContext, useState } from "react";
import { ApiContext } from "./ApiContext";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function Delete({ id }) {
  const { data, setData, filteredData, setFilteredData } = useContext(ApiContext);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://68ce7f436dc3f350777f2e0c.mockapi.io/Expenses/${id}`);
      
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      setFilteredData(filteredData.filter(item => item.id !== id));
      localStorage.setItem("entries", JSON.stringify(newData));
      setConfirm(false);
        console.log("Deleted successfully", id);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setConfirm(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full transition flex items-center justify-center"
        title="Delete"
      >
        <FaTrash size={14} />
      </button>

      {confirm && (
        <div className="absolute right-0 -mb-2  p-4 w-48 bg-white shadow-lg rounded-lg flex flex-col gap-2 z-10">
          <p className="text-sm text-gray-700">Are you sure you want to delete?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Delete;
