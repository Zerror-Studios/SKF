import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MovieTrailerVideo = ({ showVideo, setShowVideo, trailer }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(showVideo);

  useEffect(() => {
    if (showVideo) {
      setIsVisible(true); // ensure mounted
    }
  }, [showVideo]);

  useEffect(() => {
    const navEl = document.querySelector("nav");
    if (isVisible && overlayRef.current && containerRef.current && navEl) {
      const tl = gsap.timeline();

      // Step 1: Fade in overlay
      tl.fromTo(
        overlayRef.current,
        { backgroundColor: "rgba(0,0,0,0)", pointerEvents: "none" },
        {
          backgroundColor: "rgba(0,0,0,0.5)",
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            overlayRef.current.style.pointerEvents = "auto";
          },
        }
      )

        // Step 2: Slide + fade in video container
        .fromTo(
          containerRef.current,
          { autoAlpha: 0, y: "-100%", scale: 0.7 },
          { autoAlpha: 1, y: "0%", duration: 0.5, ease: "power4.out" }
        )

        // Step 3: Move nav up and scale video
        .to(
          navEl,
          {
            duration: 0.8,
            transform: "translateY(-150%)",
            overwrite: "auto",
            ease: "power4.out",
          },
          "u"
        )
        .to(
          containerRef.current,
          {
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            onComplete: () => {
              // ✅ Autoplay iframe YouTube video
              if (iframeRef.current) {
                const src = new URL(iframeRef.current.src);
                if (!src.searchParams.has("autoplay")) {
                  src.searchParams.set("autoplay", "1");
                  iframeRef.current.src = src.toString();
                }
              }
            },
          },
          "u"
        );
    }
  }, [isVisible]);

  const handleClose = () => {
    const nav = document.querySelector("nav");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setShowVideo(false);
      },
    });

    tl.to(
      containerRef.current,
      {
        scale: 0.85,
        duration: 0.35,
        ease: "power3.in",
      },
      "u"
    )
      .to(
        nav,
        {
          duration: 0.8,
          transform: "translateY(0%)",
          overwrite: "auto",
          ease: "power4.out",
        },
        "u"
      )
      .to(containerRef.current, {
        autoAlpha: 0,
        y: "-100%",
        duration: 0.5,
        ease: "power4.in",
      })
      .to(overlayRef.current, {
        backgroundColor: "rgba(0,0,0,0)",
        duration: 0.45,
        ease: "power2.inOut",
        onStart: () => {
          overlayRef.current.style.pointerEvents = "none";
        },
      });

    // Stop video playback by resetting iframe src
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src.replace("&autoplay=1", "");
    }
  };

  if (!isVisible) return null;

  // Convert YouTube link to embeddable format
  const embedUrl = trailer?.replace("watch?v=", "embed/");

  return (
    <div ref={overlayRef} id="movie_trailer_video">
      <div ref={containerRef} className="movie_trailer_container">
        <button onClick={handleClose}>✖</button>
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={`${embedUrl}?enablejsapi=1&rel=0`}
          title="YouTube trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default MovieTrailerVideo;
