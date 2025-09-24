import React from "react";
import Image from "next/image";

const TrailerCard = ({ trailer, index, panelsRef }) => {
  return (
    <div
      className={`trailer_panel trailer_panel${index + 1}`}
      ref={(el) => (panelsRef.current[index] = el)}
    >
      <div className="trailer_panel_poster">
        <Image
          width={1000}
          height={1000}
          src={trailer.poster}
          alt={`trailer-${index + 1}`}
        />
      </div>
      <div className="trailer_panel_info">
        <p>{trailer.title}</p>
        <p>{trailer.date}</p>
      </div>
    </div>
  );
};

export default TrailerCard;
