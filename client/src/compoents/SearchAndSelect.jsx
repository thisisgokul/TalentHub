import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

const SearchAndSelect = () => {
  return (
    <div className="flex flex-col p-4 md:flex-row">
      <div className="flex-1 rounded-lg p-4 mb-1 md:mb-0 md:mr-4 relative">
        <input
          type="text"
          id="search"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg pl-10 focus:outline-none"
          placeholder="Enter your search term"
        />
        <div className="absolute top-4 bg-green-600 rounded-lg text-white px-2 py-1 right-4 pl-3 pt-2">
          <AiOutlineSearch size={31} />
        </div>
      </div>

      <div className="flex-1 rounded-lg p-4">
        <select
          id="select"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none font-medium"
        >
          <option value="option1">select</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    </div>
  )
}

export default SearchAndSelect