import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Const } from "@/utils/Constant";
import SiteNavigationSchema from "./SiteNavigationSchema";
import WebPageSchema from "./WebPageSchema";
import NewsMediaOrganizationSchema from "./NewsMediaOrganizationSchema";

const SeoHeader = ({ meta = {}, schemaData }) => {
  const router = useRouter();
  const canonical = `${Const.ClientLink}${router.asPath === "/" ? "" : router.asPath}`;

  return (
    <>
      <Head>
        {/* Charset & Viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Title & Meta */}
        <title>
          {meta.title ?? "Salman Khan Films (SKF) – Official Bollywood Production House"}
        </title>
        <meta
          name="description"
          content={
            meta.description ??
            "Discover Salman Khan Films (SKF) – a leading Bollywood studio producing blockbuster movies and inspiring cinematic experiences."
          }
        />
        <meta
          name="keywords"
          content={
            meta.keywords ??
            "Salman Khan Films, SKF, Bollywood production house, Indian film studio, Salman Khan movies, SKF official site"
          }
        />
        <meta name="author" content="Salman Khan Films" />
        <meta
          name="robots"
          content={`${meta?.robots ?? "index,follow"}, max-image-preview:large`}
        />
        <link rel="canonical" href={meta.canonical ?? canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:title"
          content={
            meta.ogTitle ??
            meta.title ??
            "Salman Khan Films (SKF) – Official Bollywood Production House"
          }
        />
        <meta
          property="og:description"
          content={
            meta.ogDescription ??
            meta.description ??
            "Explore Salman Khan Films (SKF) – a creative force in Bollywood storytelling and entertainment."
          }
        />
        <meta
          property="og:image"
          content={
            meta.ogImage ??
            "https://skf-ten.vercel.app/images/skf-social-share.jpg"
          }
        />
        <meta property="og:site_name" content="Salman Khan Films" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            meta.twitterTitle ??
            meta.title ??
            "Salman Khan Films (SKF) – Official Bollywood Production House"
          }
        />
        <meta
          name="twitter:description"
          content={
            meta.twitterDescription ??
            meta.description ??
            "Explore Salman Khan Films – a Bollywood studio bringing stories to life."
          }
        />
        <meta
          name="twitter:image"
          content={
            meta.twitterImage ??
            "https://skf-ten.vercel.app/images/skf-social-share.jpg"
          }
        />
        <meta name="twitter:site" content="@SKFilmsOfficial" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />

        {/* Schema: WebPage + Organization + Navigation */}
        <WebPageSchema
          name={meta?.title ?? "Salman Khan Films"}
          description={meta?.description ?? "Official website of Salman Khan Films (SKF)."}
          url={meta?.canonical ?? canonical}
        />

        <NewsMediaOrganizationSchema
          name="Salman Khan Films"
          clientLink={`${Const.ClientLink}/`}
          logoUrl={`${Const.ClientLink}/favicon.png`}
          address={{
            streetAddress: "",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "",
          }}
          contact={{
            telephone: "",
            contactType: "Production Inquiries",
            areaServed: "IN",
            availableLanguage: "English",
            hoursAvailable: {
              opens: "",
              closes: "",
            },
          }}
          sameAs={[
            "https://x.com/skfilmsofficial?s=21",
            "https://www.instagram.com/skfilmsofficial?igsh=MmU0MXh5M28xZHlw",
            "https://youtube.com/@salmankhanfilms?si=t5TS1bnfuDtDWRpR"
          ]}
        />

        <SiteNavigationSchema />
      </Head>
    </>
  );
};

export default SeoHeader;
