import { navLinks } from "@/helper/menuData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (pathname === "/contact") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);

  if (!showFooter) return null;

  return (
    <footer>
      <div id="footer_top">
        <div>
          <h2>Salman Khan Flims</h2>
          <h5 className="message_mobile">
            Creating stories that inspire <br /> and entertain.
          </h5>
        </div>
        <div id="footer_top_right">
          <div className="footer_links">
            <h5>menu</h5>
            {[{ href: "/", label: "home" }, ...navLinks].map(
              ({ href, label }) => {
                const isActive =
                  href === "/" ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={isActive ? "active" : ""}
                  >
                    {label}
                  </Link>
                );
              }
            )}
          </div>
          <div className="footer_links">
            <h5>Socials</h5>
            <div className="footer_social">
              <Link href="https://x.com/skfilmsofficial?s=21" target="_blank">
                <FaXTwitter />
              </Link>
              <Link
                href="https://www.instagram.com/skfilmsofficial?igsh=MmU0MXh5M28xZHlw"
                target="_blank"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://youtube.com/@salmankhanfilms?si=t5TS1bnfuDtDWRpR"
                target="_blank"
              >
                <AiOutlineYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="footer_bottom">
        <div id="footer_bottom_left">
          <h5 className="message_desktop">
            Creating stories that inspire <br /> and entertain.
          </h5>
        </div>
        <div id="footer_bottom_right">
          <p>© 2025 Salman Khan Films. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
