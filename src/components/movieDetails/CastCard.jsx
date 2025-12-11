import React from "react";
import Image from "next/image";

const CastCard = ({ data }) => {
  return (
    <div className="director_card_left">
      <div className="director_card_name">
        <span>{data?.name}</span>
      </div>
      <div className="director_card_img">
        <Image
          width={1000}
          height={1000}
          src={data?.image}
          alt={data?.name}
          priority
        />
      </div>
    </div>
  );
};

export default CastCard;
