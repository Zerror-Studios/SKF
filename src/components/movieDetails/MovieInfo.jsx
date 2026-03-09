import Image from "next/image";
import React from "react";

const MovieInfo = ({ info, detailsRef }) => {
  const firstPlatform = info?.watchNow?.[0];

  const platformImages = {
    netflix: "/images/netflix.png",
    prime: "/images/prime.png",
    zee: "/images/zee.png",
    hotstar: "/images/hotstar.webp",
    youtube: "/images/youtube.webp",
  };

  const platformName = firstPlatform?.platform?.toLowerCase() || "";

  const platformKey = platformName.includes("netflix")
    ? "netflix"
    : platformName.includes("prime")
      ? "prime"
      : platformName.includes("zee")
        ? "zee"
        : platformName.includes("hotstar") || platformName.includes("disney")
          ? "hotstar"
          : platformName.includes("youtube")
            ? "youtube"
            : null;

  return (
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

      {info?.genre && (
        <div>
          <p>Genre</p>
          <h4>{info.genre}</h4>
        </div>
      )}

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
  );
};

export default MovieInfo;
