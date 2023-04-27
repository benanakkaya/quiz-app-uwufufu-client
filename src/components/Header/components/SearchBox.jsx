import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ setSearchBoxVisibility }) => {
  const navigate = useNavigate();
  const [searchIndex, setSearchIndex] = useState("");

  const handleSearchBox = () => {
    setSearchBoxVisibility((prev) => !prev);
  };

  const handleSearch = () => {
    navigate(`/search/${searchIndex}`);
    setSearchBoxVisibility((prev) => !prev);
  };

  return (
    <div className="bg-customDark z-30 absolute top-full py-6 flex gap-3 w-full items-center justify-center border-b-[1px] border-b-customGray  px-6 sm:px-8 md:px-10 lg:px-12">
      <div className="flex-1 flex items-center rounded-full border-customGray border-[1px] p-1 bg-customLightDark ">
        <input
          onChange={(e) => setSearchIndex(e.target.value)}
          className="flex-1 outline-none w-40 sm:48 md:w-72 bg-customLightDark  px-2 py-1 rounded-l-full text-white placeholder:text-customGray "
          type="text"
          placeholder="Quiz..."
        />
        <button
          onClick={handleSearch}
          className="bg-customRed px-2  py-1 h-full rounded-full"
        >
          SEARCH
        </button>
      </div>
      <AiOutlineCloseCircle
        onClick={handleSearchBox}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
};

export default SearchBox;
