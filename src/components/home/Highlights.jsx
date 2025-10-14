import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../common/Button";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const highlightData = [
  {
    id: 1,
    date: "August 1, 2025",
    title: "Sikander Creates Box Office Storm",
    description:
      "Sikander, starring Karthi and directed by Siva, has taken the box office by storm, raking in impressive numbers during its opening weekend. The film's gripping storyline and stellar performances have captivated audiences nationwide.",
    image: "/images/home/news1.png",
  },
  {
    id: 2,
    date: "August 1, 2025",
    title: "Kisi Ka Bhai Kisi Ki Jaan Finds New Audience on OTT",
    description:
      "Kisi Ka Bhai Kisi Ki Jaan, featuring Salman Khan, has found a new audience on OTT platforms. The film's blend of action and drama has resonated with viewers, leading to a surge in streaming numbers and positive reviews.",
    image: "/images/home/news2.png",
  },
  {
    id: 3,
    date: "August 1, 2025",
    title: "Kick 2 Brings Back Devil in Style",
    description:
      "Kick 2, the much-anticipated sequel to the original Kick, has brought back the devil in style. With its high-octane action sequences and charismatic lead performance, the film has rekindled the excitement of fans and critics alike.",
    image: "/images/home/news3.png",
  },
];

const Highlights = ({ tag, title }) => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const router = useRouter();

  useSplitTextMaskAnimation([titleRef]);

  useGSAP(() => {
    const splits = [];

    const runAnimation = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const image = card.querySelector(".highlight_img img");
        const line = card.querySelector(".highlight_line");
        const elements = card.querySelectorAll(
          ".highlight_info p, .highlight_info h4"
        );

        elements.forEach((el) => {
          const split = new SplitText(el, {
            type: "lines",
            linesClass: "line",
          });
          splits.push(split);

          const lines = el.querySelectorAll(".line");
          gsap.set(lines, { yPercent: 100, opacity: 0 });

          gsap.to(lines, {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });
        });

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        if (line) {
          gsap.fromTo(
            line,
            { width: 0 },
            {
              width: "100%",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    };

    const fontReady = document.fonts?.ready || Promise.resolve();
    const imagesReady = Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve);
            })
        )
    );

    Promise.all([fontReady, imagesReady]).then(() => {
      requestAnimationFrame(() => setTimeout(runAnimation, 50));
    });

    return () => {
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();
    };
  }, [router.asPath]); // 🔥 Re-run animation when route path changes

  // 🧹 Clean up GSAP + triggers on Next.js route change
  useEffect(() => {
    const handleRouteChange = () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  return (
    <section id="highlight_section">
      {tag && <h5 className="tag">{tag}</h5>}
      {title && <h2 ref={titleRef}>{title}</h2>}

      <div id="highlights_container">
        {highlightData.map((item, index) => (
          <div
            key={item.id}
            className="highlight_card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="highlight_info">
              <div className="highlight_info_dets">
                <p>{item.date}</p>
                <h4>{item.title}</h4>
                <p className="description">{item.description}</p>
              </div>
              <Button title="Read More" color="black" />
            </div>

            <div className="highlight_img">
              <Image
                priority
                width={1000}
                height={1000}
                src={item.image}
                alt={item.title}
              />
            </div>

            {index !== highlightData.length - 1 && (
              <div className="highlight_line"></div>
            )}
          </div>
        ))}
      </div>

      <div className="btn_container">
        <Button color="black" title="read more" />
      </div>
    </section>
  );
};

export default Highlights;
