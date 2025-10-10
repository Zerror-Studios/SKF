import React from "react";

const GalleryTitleSection = ({ data }) => {
  return (
    <div id="gallery_title">
      <div className="about_top_wrapper">
        <div className="about_hero_title">
          <h5 className="tag ">Gallery</h5>
          <h2 className="heading ">
            {data?.title ? (
              data.title
            ) : (
              <>
                Inside the <span className="letter-u">Frame</span>
              </>
            )}
          </h2>
        </div>
        <div className="about_hero_info">
          <p className="description ">
            Explore exclusive moments, unseen footage, and special glimpses from
            the world of SKF
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryTitleSection;
