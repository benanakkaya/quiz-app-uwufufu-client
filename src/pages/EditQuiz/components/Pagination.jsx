import React, { useEffect, useState } from "react";

const Pagination = ({ totalPage, activePage, setActivePage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(Array.from({ length: totalPage }, (_, i) => i + 1));
  }, [totalPage]);

  return (
    <div className="flex w-full items-center justify-center text-white font-bold gap-3">
      {pages.map((page) => (
        <div
          key={page}
          onClick={() => setActivePage(page)}
          disabled={activePage === page}
          className={`${
            activePage !== page ? "cursor-pointer" : null
          } h-8 w-8 flex items-center justify-center rounded-full ${
            page === activePage ? "bg-customGray" : "bg-customLightGray"
          }`}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
