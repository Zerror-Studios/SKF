import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Const } from "@/utils/Constant";
import WebPageSchema from "./WebPageSchema";
import SiteNavigationSchema from "./SiteNavigationSchema";
import OrganizationSchema from "./OrganizationSchema";
import { news } from "@/helper/newsData";
import NewsArticleSchema from "./NewsArticleSchema";
import MovieSchema from "./MovieSchema";

const SeoHeader = ({ meta, news, movie }) => {
  const router = useRouter();
  const canonical = `${Const.ClientLink}/${router.asPath?.slice(1)}`;

  return (
    <Head>
      <title>{meta?.title ?? ""}</title>

      <meta name="description" content={meta?.description ?? ""} />
      <meta name="keywords" content={meta?.keywords ?? ""} />
      <meta name="author" content={meta?.author ?? "Salman Khan Films"} />
      <meta
        name="robots"
        content={
          `${meta?.robots}, max-image-preview:large` ??
          "index,follow, max-image-preview:large"
        }
      />

      {/* Canonical */}
      <link rel="canonical" href={meta?.canonical ?? canonical} />

      {/* OG Tags */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta?.og?.title ?? meta?.title} />
      <meta
        property="og:description"
        content={meta?.og?.description ?? meta?.description}
      />
      <meta property="og:url" content={meta?.canonical ?? canonical} />
      <meta property="og:site_name" content="Salman Khan Films" />
      <meta property="og:image" content={meta?.og?.image ?? "/skf-og.png"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Tags */}
      <meta
        name="twitter:card"
        content={meta?.twitter?.card ?? "summary_large_image"}
      />
      <meta
        name="twitter:title"
        content={meta?.twitter?.title ?? meta?.title}
      />
      <meta
        name="twitter:description"
        content={meta?.twitter?.description ?? meta?.description}
      />
      <meta name="twitter:site" content="@skfilmsofficial" />
      <meta
        name="twitter:image"
        content={meta?.twitter?.image ?? "/skf-og.png"}
      />
      <meta name="twitter:creator" content="@skfilmsofficial" />

      {/* General */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Hreflang */}
      <link
        rel="alternate"
        hrefLang="en"
        href={meta?.canonical ?? canonical}
      />
      {news && <NewsArticleSchema news={news} />}
      {movie && <MovieSchema movie={movie} />}
      {/* Schema Markup */}
      <WebPageSchema
        name={meta?.title ?? ""}
        description={meta?.description ?? ""}
        url={meta?.canonical ?? canonical}
      />

      <OrganizationSchema
        name="Salman Khan Films"
        clientLink="https://salmankhanfilms.com"
        logoUrl="https://salmankhanfilms.com/logo.png"
        address={{
          streetAddress: "Andheri West",
          addressLocality: "Mumbai",
          addressRegion: "MH",
          postalCode: "400053",
        }}
        contact={{
          telephone: "+91-XXXXXXXXXX",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
          hoursAvailable: {
            opens: "09:00",
            closes: "18:00",
          },
        }}
        sameAs={[
          "https://x.com/skfilmsofficial",
          "https://www.instagram.com/skfilmsofficial",
          "https://www.youtube.com/@salmankhanfilms",
        ]}
      />

      <SiteNavigationSchema />
    </Head>
  );
};

export default SeoHeader;
