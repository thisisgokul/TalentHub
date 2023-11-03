import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchAndSelect = ({ searchAndSelect, setSearchAndSelect }) => {
  const handleChange = (e) => {
    setSearchAndSelect({ ...searchAndSelect, [e.target.id]: e.target.value });
  };

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get("/alldata").then(({ data }) => {
      setAllData(data);
    });
  }, []);

  const filteredData = allData.filter(
    (data) => data.category && data.category !== ""
  );
  const uniqueCategories = [
    ...new Set(filteredData.map((option) => option.category)),
  ];

  return (
    <div className="flex flex-col p-4 md:flex-row">
      <div className="flex-1 rounded-lg p-4 mb-1 md:mb-0 md:mr-4 relative">
        <input
          type="text"
          id="search"
          onChange={handleChange}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg pl-10 focus:outline-none"
          placeholder="Enter your search term"
        />
        <div className="absolute top-4 cursor-pointer bg-green-600 rounded-lg text-white px-2 py-1 right-4 pl-3 pt-2">
          <AiOutlineSearch size={31} />
        </div>
      </div>

      <div className="flex-1 rounded-lg p-4">
        <select
          onChange={handleChange}
          id="select"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none font-medium"
        >
          <option value="">All category</option>

          {uniqueCategories.map((category, index) => (
            <option className="bg-green-600 text-white text-lg" key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndSelect;
