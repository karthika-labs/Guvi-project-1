import { createContext, useState, useEffect } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData]=useState([])
   const [sortBy, setSortBy] = useState(""); 


 useEffect(() => {
  const fetchData = async () => {
    try {
      let res = await fetch("https://68ce7f436dc3f350777f2e0c.mockapi.io/Expenses");
      let api_data = await res.json();

      localStorage.setItem("entries", JSON.stringify(api_data));
      setData(api_data);
      setFilteredData(api_data);
      console.log("successfully fetched data from server", api_data);
    } catch (error) {
      console.log("error fetching data from server", error);

      // fallback to localStorage if API fails
      let savedData = localStorage.getItem("entries");
      if (savedData) {
        setData(JSON.parse(savedData));
        setFilteredData(JSON.parse(savedData));
        console.log("loaded data from localStorage");
      }
    }
  };

  fetchData();
}, []);


  return (
    <ApiContext.Provider value={{ data, setData,filteredData, setFilteredData ,sortBy,setSortBy}}>
      {children}
    </ApiContext.Provider>
  );
};
export default ApiContext
