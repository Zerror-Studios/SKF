import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Const } from "@/utils/Constant";

import WebPageSchema from "./WebPageSchema";
import SiteNavigationSchema from "./SiteNavigationSchema";
import OrganizationSchema from "./OrganizationSchema";
import NewsArticleSchema from "./NewsArticleSchema";
import MovieSchema from "./MovieSchema";
import WebSiteSchema from "./WebSiteSchema";

const SeoHeader = ({ meta = {}, news, movie }) => {
  const router = useRouter();

  // Clean canonical URL
  const canonical =
    meta?.canonical ??
    `${Const.ClientLink}${router.asPath === "/" ? "" : router.asPath}`;

  const robotsContent = meta?.robots
    ? `${meta.robots}, max-image-preview:large`
    : "index,follow, max-image-preview:large";

  return (
    <Head>
      {/* ========== Basic SEO ========== */}
      <title>{meta?.title || "Salman Khan Films"}</title>
      <meta
        name="description"
        content={meta?.description || "Official website of Salman Khan Films"}
      />
      {meta?.keywords && (
        <meta name="keywords" content={meta.keywords} />
      )}
      <meta name="author" content={meta?.author || "Salman Khan Films"} />
      <meta name="robots" content={robotsContent} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* ========== Open Graph ========== */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta?.og?.title || meta?.title} />
      <meta
        property="og:description"
        content={meta?.og?.description || meta?.description}
      />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Salman Khan Films" />
      <meta property="og:image" content={meta?.og?.image || "/skf-og.png"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ========== Twitter ========== */}
      <meta
        name="twitter:card"
        content={meta?.twitter?.card || "summary_large_image"}
      />
      <meta
        name="twitter:title"
        content={meta?.twitter?.title || meta?.title}
      />
      <meta
        name="twitter:description"
        content={meta?.twitter?.description || meta?.description}
      />
      <meta name="twitter:site" content="@skfilmsofficial" />
      <meta
        name="twitter:image"
        content={meta?.twitter?.image || "/skf-og.png"}
      />
      <meta name="twitter:creator" content="@skfilmsofficial" />

      {/* ========== Technical ========== */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={canonical} />

      {/* ========== Structured Data ========== */}

      {/* WebSite Schema (IMPORTANT for site name in Google) */}
      {router.pathname === "/" && (
        <WebSiteSchema
          name="Salman Khan Films"
          url={Const.ClientLink}
        />
      )}

      {/* Organization Schema */}
      <OrganizationSchema
        name="Salman Khan Films"
        clientLink={Const.ClientLink}
        logoUrl={`${Const.ClientLink}/logo.png`}
        address={{
          streetAddress: "Andheri West",
          addressLocality: "Mumbai",
          addressRegion: "MH",
          postalCode: "400053",
          addressCountry: "IN",
        }}
        contact={{
          telephone: "+91-XXXXXXXXXX",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["English"],
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

      {/* WebPage Schema */}
      <WebPageSchema
        name={meta?.title || ""}
        description={meta?.description || ""}
        url={canonical}
      />

      {/* Conditional Schemas */}
      {news && <NewsArticleSchema news={news} />}
      {movie && <MovieSchema movie={movie} />}

      <SiteNavigationSchema />
    </Head>
  );
};

export default SeoHeader;