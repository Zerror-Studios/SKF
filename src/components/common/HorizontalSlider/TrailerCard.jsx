import React from "react";

const TrailerCard = ({ trailer, index, panelsRef }) => {
  return (
    <div
      className={`trailer_panel trailer_panel${index + 1}`}
      ref={panelsRef ? (el) => (panelsRef.current[index] = el) : null}
    >
      <div className="trailer_panel_poster">
        <div className="trailer_banner">
          <iframe
            width="100%"
            height="100%"
            src={trailer?.iframeUrl}
            title="YouTube trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>

        <div className="trailer_panel_info">
          <p>{trailer.title}</p>
          <p>{trailer.type}</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerCard;
