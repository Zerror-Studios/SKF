import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import DirectorsContainer from "../common/Directors/DirectorsContainer";
import CastCard from "./CastCard";

const directors = [
  { id: 1, name: "Salman khan", image: "/images/moviedetails/cast1.png" },
  { id: 2, name: "RASHMIKA MANDANA", image: "/images/moviedetails/cast2.png" },
  { id: 3, name: "KAJAL AGARWAL", image: "/images/moviedetails/cast3.png" },
  { id: 4, name: "Anjini Dhawan", image: "/images/moviedetails/cast4.png" },
  { id: 5, name: "Sathyaraj", image: "/images/moviedetails/cast5.png" },
  { id: 6, name: "Sharman Joshi", image: "/images/moviedetails/cast6.png" },
];

const CastSection = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="cast_section">
      <div className="cast_tag_wrap">
        <h5 className="tag">Cast and crew</h5>
      </div>

      <div id="directors_container">
        {data?.cast?.map((cast, index) => (
          <CastCard key={index} data={cast} />
        ))}
      </div>

      <Button title="show more" color="black" />
    </section>
  );
};

export default CastSection;
