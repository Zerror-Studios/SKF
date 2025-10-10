import React, { useState, useEffect } from "react";
import DirectorCard from "./DirectorCard";

const DirectorsContainer = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // open first card only on screens larger than 480px
    if (window.innerWidth > 1286) {
      setOpenIndex(0);
    }
  }, []);

  const handleOpen = (index) => setOpenIndex(index); // open specific card
  const handleClose = () => setOpenIndex(null); // close current open card

  return (
    <div id="directors_container">
      {data?.map((director, index) => (
        <DirectorCard
          key={index}
          data={director}
          isOpen={openIndex === index}
          onOpen={() => handleOpen(index)}
          onClose={handleClose}
        />
      ))}
    </div>
  );
};

export default DirectorsContainer;
