

import { useFormik } from "formik";
import { useState } from "react";

function Add({ handleAdd }) {
  const [toast, setToast] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount: "",
      Category: "",
      Date: "",
      Notes: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.amount) {
        errors.amount = "Amount is required";
      }
      if (!values.Category) {
        errors.Category = "Category is required";
      }
      if (!values.Date) {
        errors.Date = "Date is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      handleAdd(values);
      setToast(true);
           setTimeout(() => {
        setToast(false);
      }, 3000);
    },
  });

  return (
    <div className="space-y-5 flex flex-wrap items-center justify-center">
      <h4 className="flex flex-1 items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-blue-500 via-purple-600 to-blue-300 rounded">
        📝 Log your Expen<span className="text-green-300">$</span>e
      </h4>
      {toast && (
        <div
          id="toast-top-right"
          class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500  divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg  left-1 top-11 lg:top-1 left-1 dark:text-gray-400 "
          role="alert"
        >
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs  mb-4 text-gray-500 shadow-sm border border-green-500 rounded-lg shadow-sm bg-gray-100 lg:bg-white"
            role="alert"
          >
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500  rounded-lg  dark:text-green-400">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Added successfully.</div>
          </div>
        </div>
      )}
      <form
        className="bg-white   p-3 w-full   space-y-5"
        onSubmit={formik.handleSubmit}
      >
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            type="number"
            placeholder="Enter amount"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.errors.amount && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {formik.errors.amount}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mt-2">
            {["Food", "Travel", "Bills", "Others"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="Category"
                  value={cat}
                  onChange={formik.handleChange}
                  checked={formik.values.Category === cat}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                {cat}
              </label>
            ))}
          </div>
          {formik.errors.Category && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {formik.errors.Category}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            name="Date"
            value={formik.values.Date}
            onChange={formik.handleChange}
            type="date"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.errors.Date && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {formik.errors.Date}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <input
            name="Notes"
            value={formik.values.Notes}
            onChange={formik.handleChange}
            type="text"
            placeholder="Optional notes"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
          <button
            type="submit"
            className="w-full  cursor-pointer bg-[#66a3ff] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition font-medium text-sm sm:text-base"
          >
            ➕ Add Expense
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="bg-gray-300 flex items-center justify-center cursor-pointer text-white px-4 py-2 transition duration-300 hover:scale-105 rounded"
          >
            <span className="transition cursor-pointer duration-300 hover:scale-110 hover:text-rose-600  text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
