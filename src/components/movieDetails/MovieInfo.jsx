import Image from "next/image";
import React from "react";

const MovieInfo = ({ info, detailsRef }) => {
  const firstPlatform = info?.watchNow?.[0];

  const platformImages = {
    netflix: "/images/moviedetails/netflix.png",
    prime: "/images/moviedetails/prime.png",
    zee: "/images/moviedetails/zee.png",
  };

  const platformKey = firstPlatform?.platform?.toLowerCase().includes("netflix")
    ? "netflix"
    : firstPlatform?.platform?.toLowerCase().includes("prime")
      ? "prime"
      : firstPlatform?.platform?.toLowerCase().includes("zee")
        ? "zee"
        : null;

  return (
    <>
      <div
        ref={detailsRef}
        className="movie_details_info"
        style={{ transform: "translateY(60%)", opacity: 0 }}
      >
        {info?.produced && (
          <div className="movie_details_info_produce">
            <p>Produced By</p>
            <h4>{info.produced}</h4>
          </div>
        )}

        {info?.director && (
          <div>
            <p>Directed By</p>
            <h4>{info.director}</h4>
          </div>
        )}

        <div>
          <p>Genre</p>
          <h4>Action | Thriller</h4>
        </div>

        {platformKey && (
          <div className="netflix">
            <p>Watch now</p>

            <div className="watch-now">
              <a
                href={firstPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={1000}
                  height={1000}
                  src={platformImages[platformKey]}
                  alt={firstPlatform.platform}
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieInfo;
