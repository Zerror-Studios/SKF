import { navLinks } from "@/helper/menuData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();
   if (pathname === "/contact") return null;
  return (
    <footer>
      <div id="footer_top">
        <h2>Salman Khan Flims</h2>
        <div id="footer_top_right">
          <div className="footer_links">
            <h5>menu</h5>
            {[{ href: "/", label: "home" }, ...navLinks].map(
              ({ href, label }) => {
                // Use startsWith for sub-routes
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
            <h5>Our Address</h5>
            <Link href="/">
              Shop No. 1, Oceanside Cooperative Housing Society, Chimbai Road,
              Near Chimbai Police Chowky, Bandra (W), Mumbai, Maharashtra,
              400050, India
            </Link>
            <Link href="/">+91 8739402482</Link>
          </div>
          <div className="footer_links">
            <h5>Socials</h5>
            <div className="footer_social">
              <FaXTwitter />
              <FaInstagram />
              <AiOutlineYoutube />
            </div>
          </div>
        </div>
      </div>
      <div id="footer_bottom">
        <div id="footer_bottom_left">
          <h5>
            Creating stories that inspire <br /> and entertain, Write to us{" "}
          </h5>
          <Link href="/">contact@skf.in</Link>
        </div>
        <div id="footer_bottom_right">
          <p>© 2025 Salman Khan Films. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
