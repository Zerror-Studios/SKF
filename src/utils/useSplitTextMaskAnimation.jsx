import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const useSplitTextMaskAnimation = (refs = []) => {
  useGSAP(() => {
    const splits = [];

    const runSplitAnimation = () => {
      refs.forEach((ref) => {
        if (!ref?.current) return;

        // Split lines with masking
        const split = new SplitText(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });

        splits.push(split);

        const lines = ref.current.querySelectorAll(".line");

        gsap.set(lines, { yPercent: 100 });

        gsap.to(lines, {
          yPercent: 0,
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 50%",
            markers: false,
          },
        });
      });

      // Refresh to ensure proper positioning
      ScrollTrigger.refresh();
    };

    // Wait until all fonts are loaded
    const fontReady = document.fonts?.ready || Promise.resolve();

    fontReady.then(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          // Guard clause: wait for refs to be available
          if (refs.length === 0 || refs.some((r) => !r?.current)) return;
          runSplitAnimation();
        }, 50); // give layout time to settle
      });
    });

    // Clean up and revert SplitText when unmounting
    return () => {
      splits.forEach((s) => s.revert());
    };
  }, [refs.map((r) => r.current).join("-")]);
};
