import { useContext, useState, useEffect } from "react";
import { ApiContext } from "./ApiContext";
import Delete from "./Delete";
import Edit from "./Edit";
import Filter from "./Filter";
import Sort from "./Sort";
import ChartCategory from "./ChartCategory";
import {
  FaUtensils,
  FaPlane,
  FaFileInvoiceDollar,
  FaRegStar,
} from "react-icons/fa";
function View() {
  const categoryIcons = {
    Food: <FaUtensils className="text-green-500" />,
    Travel: <FaPlane className="text-blue-500" />,
    Bills: <FaFileInvoiceDollar className="text-yellow-500" />,
    Others: <FaRegStar className="text-purple-500" />,
  };
  const { filteredData } = useContext(ApiContext);
  const [filter, setFilter] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPerCategory, setTotalPerCategory] = useState({});
  useEffect(() => {
    const sum = filteredData.reduce(
      (acc, item) => acc + parseInt(item.amount),
      0
    );
    setTotal(sum);
    const CategoryArray = filteredData.reduce((acc, item) => {
      if (!acc[item.Category]) {
        acc[item.Category] = 0;
      }
      acc[item.Category] = acc[item.Category] + parseInt(item.amount);
      return acc;
    }, {});
    console.log("TotalPerCategory", CategoryArray);
    setTotalPerCategory(CategoryArray);
  }, [filteredData]);
  return (
    <div className="max-w-4xl mx-auto mt-4 ">
      {" "}
      {/* Table Header */}{" "}
      <div className="flex gap-4 flex-wrap items-start">
        {" "}
        <div className="font-semibold bg-white rounded w-28 h-28 flex flex-col items-center justify-center p-2 shadow">
          Total: ₹{total}
        </div>{" "}
        {Object.keys(totalPerCategory).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded h-full flex flex-row items-center justify-center p-2 shadow"
          >
            {" "}
            <div className="text-3xl mb-2">{categoryIcons[item]}</div>{" "}
            <div className="text-center">
              {" "}
              <p className="font-medium">{item}</p>{" "}
              <p className="font-semibold">₹{totalPerCategory[item]}</p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <ChartCategory totalPerCategory={totalPerCategory}></ChartCategory>{" "}
      <button onClick={() => setFilter(!filter)}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />{" "}
        </svg>{" "}
      </button>{" "}
      <div className="flex justify-between items-center gap-4 my-2">
        {" "}
        <div className="flex items-center gap-4">
          {" "}
          {filter && <Filter></Filter>}{" "}
        </div>{" "}
        <Sort></Sort>{" "}
      </div>{" "}
      <div className="grid grid-cols-5 gap-4 font-bold border-b pb-2">
        {" "}
        <div>Date</div> <div>Amount</div> <div>Category</div> <div>Notes</div>{" "}
        <div>Actions</div>{" "}
      </div>{" "}
      {/* Table Rows */}{" "}
      {filteredData.length <= 0 ? (
        <div>No Match found</div>
      ) : (
        filteredData.map((value, index) => (
          <Edit key={index} updateData={value}></Edit>
        ))
      )}{" "}
    </div>
  );
}
export default View;


// import { useState, useContext } from "react";
// import { ApiContext } from "./ApiContext";
// import axios from "axios";
// import Delete from "./Delete";
// import { useFormik } from "formik";

// function Edit({ updateData }) {
//   console.log("")
//   const { data, setData,filteredData, setFilteredData } = useContext(ApiContext);
//   const [isEditing, setIsEditing] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       amount: updateData.amount,
//       Category: updateData.Category,
//       Date: updateData.Date,
//       Notes: updateData.Notes,
//     },
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       handleEdit(values);
//     },
//   });

//   let handleEdit = async (values) => {
//     try {
//       const response = await axios.put(
//         `https://68ce7f436dc3f350777f2e0c.mockapi.io/Expenses/${updateData.id}`,
//         { ...values, id: updateData.id }
//       );

//       const index = data.findIndex((item) => item.id === updateData.id);
//       const newData = [...data];
//       newData[index] = response.data;
//       setData(newData);
      
//       setFilteredData(filteredData.map((item)=>item.id===updateData.id?response.data : item))
//       setIsEditing(false);

//       localStorage.setItem("entries", JSON.stringify(newData));
      
//       console.log("updated successfully", response.data);
//     } catch (error) {
//       console.log("error in updating", error);
//     }
//   };

//   return (
//     <>
//       {isEditing ? (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="grid grid-cols-6 gap-4 border-b py-2 items-center"
//         >
//           <input
//             type="date"
//             name="Date"
//             value={formik.values.Date}
//             onChange={formik.handleChange}
//             className="border px-2 py-1 w-full"
//           />
//           <input
//           type="number"
//             name="amount"
//             value={formik.values.amount}
//             onChange={formik.handleChange}
//             className="border px-2 py-1 w-full"
//           />
//           <input
//             name="Category"
//             value={formik.values.Category}
//             onChange={formik.handleChange}
//             className="border px-2 py-1 w-full"
//           />
//           <input
//             name="Notes"
//             value={formik.values.Notes}
//             onChange={formik.handleChange}
//             className="border px-2 py-1 w-full"
//           />
//           <div className="flex gap-2 flex-wrap ">
//             <button
//               type="submit"
//               className="bg-green-500 text-white px-2 py-1 rounded"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-400 text-white px-2 py-1 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//           <Delete id={updateData.id} />
//         </form>
//       ) : (
//         <div className="grid grid-cols-6 gap-4 border-b py-2 items-center">
//           <div>{updateData.amount}</div>
//           <div>{updateData.Category}</div>
//           <div>{updateData.Notes}</div>
//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-blue-500 text-white px-2 py-1 rounded"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
// </svg>

//           </button>
//           <Delete id={updateData.id} />
//         </div>
//       )}
//     </>
//   );
// }

// export default Edit;






// import { useState, useContext } from "react";
// import { ApiContext } from "./ApiContext";
// import axios from "axios";
// import Delete from "./Delete";
// import { FaEdit } from "react-icons/fa";

// function Edit({ updateData }) {
//   const { data, setData, filteredData, setFilteredData } = useContext(ApiContext);
//   const [isEditing, setIsEditing] = useState(false);

//   const categoryColors = {
//     Food: "bg-green-500",
//     Travel: "bg-blue-500",
//     Bills: "bg-yellow-500",
//     Others: "bg-purple-500",
//   };

//   const [values, setValues] = useState({
//     amount: updateData.amount,
//     Category: updateData.Category,
//     Notes: updateData.Notes,
//     Date: updateData.Date,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   const handleEdit = async () => {
//     try {
//       const response = await axios.put(
//         `https://68ce7f436dc3f350777f2e0c.mockapi.io/Expenses/${updateData.id}`,
//         { ...values, id: updateData.id }
//       );

//       const index = data.findIndex((item) => item.id === updateData.id);
//       const newData = [...data];
//       newData[index] = response.data;
//       setData(newData);
//       setFilteredData(
//         filteredData.map((item) => (item.id === updateData.id ? response.data : item))
//       );
//       setIsEditing(false);
//       localStorage.setItem("entries", JSON.stringify(newData));
//     } catch (error) {
//       console.log("Error updating", error);
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center gap-2 hover:shadow-lg transition">
//       <div className={`px-3 py-1 rounded-full ${categoryColors[updateData.Category]} text-white font-bold min-w-[70px] text-center`}>
//         {isEditing ? (
//           <input
//             type="text"
//             name="Category"
//             value={values.Category}
//             onChange={handleChange}
//             className="bg-transparent text-white font-bold text-center w-full focus:outline-none"
//           />
//         ) : (
//           updateData.Category
//         )}
//       </div>

//       <div className="flex-1 flex flex-col">
//         {isEditing ? (
//           <input
//             type="number"
//             name="amount"
//             value={values.amount}
//             onChange={handleChange}
//             className="bg-transparent font-semibold text-lg focus:outline-none w-full"
//           />
//         ) : (
//           <p className="font-semibold text-lg">₹{updateData.amount}</p>
//         )}

//         {isEditing ? (
//           <input
//             type="text"
//             name="Notes"
//             value={values.Notes}
//             onChange={handleChange}
//             className="bg-transparent text-gray-500 focus:outline-none w-full"
//           />
//         ) : (
//           <p className="text-gray-500">{updateData.Notes}</p>
//         )}

//         {isEditing ? (
//           <input
//             type="date"
//             name="Date"
//             value={values.Date}
//             onChange={handleChange}
//             className="bg-transparent text-gray-400 text-xs focus:outline-none"
//           />
//         ) : (
//           <p className="text-xs text-gray-400 mt-1">{updateData.Date}</p>
//         )}
//       </div>

//       <div className="flex gap-2">
//         {isEditing ? (
//           <>
//             <button
//               onClick={handleEdit}
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition text-sm"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded transition text-sm"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-blue-500 hover:text-blue-700 transition"
//           >
//             <FaEdit />
//           </button>
//         )}
//         {!isEditing && <Delete id={updateData.id} />}
//       </div>
//     </div>
//   );
// }

// export default Edit;