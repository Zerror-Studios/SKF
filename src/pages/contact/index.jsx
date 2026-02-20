import ContactSection from "@/components/contact/ContactSection";
import SeoHeader from "@/components/seo/SeoHeader";
import React from "react";

const Contact = ({ meta }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <ContactSection />
    </>
  );
};

export default Contact;

export async function getStaticProps(params) {
  const meta = {
    title: "Contact Us | Salman Khan Films",
    description:
      "Get in touch with Salman Khan Films for official business enquiries, media relations, partnerships, and professional communication.",
    keywords:
      "Contact Salman Khan Films, SKF enquiries, film production contact, Bollywood studio contact",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  return {
    props: {
      meta,
    },
  };
}
