import { useEffect, useRef } from "react";
import Image from "next/image";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/dist/CustomEase";
import Link from "next/link";

gsap.registerPlugin(SplitText, CustomEase);

const ContactSection = () => {
  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");
  return (
    <div id="contact_section">
      <div id="contact-top">
        <div>
          <h2 className="heading">
            Have an <span className="letter-u">enquiry</span>? Get in
          </h2>
          <h2 className="heading">
            touch
            <span id="middle_img">
              <Image
                width={1000}
                height={1000}
                src="/images/contact/contact-img.jpg"
                alt="SKF"
              ></Image>
            </span>
            with us.
          </h2>
        </div>
        <div>
          <h5 className="tag">On this Email</h5>
          <a className="description" href="mailto:social@skvonline.com">
            social@skvonline.com
          </a>
        </div>
      </div>
      <div id="contact_bottom">
        <p className="description">Follow us on social media:</p>
        <div className="contact_social">
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
  );
};

export default ContactSection;
