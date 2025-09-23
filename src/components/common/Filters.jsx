import React, { useState } from "react";

const Filters = ({ filters = [], defaultFilter = "", onChange }) => {
  const [filter, setFilter] = useState(defaultFilter || filters[0]);

  const handleFilterClick = (f) => {
    setFilter(f);
    if (onChange) onChange(f); 
  };

  return (
    <div className="filter_movie">
      {filters.map((f, idx) => (
        <span
          key={idx}
          onClick={() => handleFilterClick(f)}
          className={`${f === filter ? "active" : ""}`}
        >
          {f}
        </span>
      ))}
    </div>
  );
};

export default Filters;
