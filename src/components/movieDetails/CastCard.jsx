import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import gsap from "gsap";

const CastCard = ({ data }) => {
  return (
    <div className="director_card">
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
    </div>
  );
};

export default CastCard;
