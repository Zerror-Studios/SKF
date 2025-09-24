import Image from "next/image";
import React from "react";

const MovieInfo = ({detailsRef}) => {
  return (
    <div
      ref={detailsRef}
      className="movie_details_info"
      style={{ transform: "translateY(60%)", opacity: 0 }}
    >
      <div>
        <p>Directed By</p>
        <h4>A.R. Murugadoss</h4>
      </div>
      <div>
        <p>Produced By</p>
        <h4>Salman Khan</h4>
      </div>
      <div>
        <p>Genre</p>
        <h4>Action | Thriller</h4>
      </div>
      <div>
        <p>Duration</p>
        <h4>2h 15m</h4>
      </div>
      <div className="netflix">
        <p>Watch now</p>
        <Image
          width={1000}
          height={1000}
          src="/images/moviedetails/netflix.png"
          alt="image"
        />
      </div>
    </div>
  );
};

export default MovieInfo;
