import React from "react";
import Image from "next/image";

const TrailerCard = ({ trailer, index, panelsRef }) => {
  return (
    <div
      className={`trailer_panel trailer_panel${index + 1}`}
      ref={panelsRef ? (el) => (panelsRef.current[index] = el) : null}
    >
      <div className="trailer_panel_poster">
       <div className="trailer_banner">
         <Image
          width={1000}
          height={1000}
          src={trailer.poster}
          alt={`trailer-${index + 1}`}
          priority
        />
       </div>
        <div className="trailer_panel_info">
          <p>{trailer.title}</p>
          <p>{trailer.date}</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerCard;
