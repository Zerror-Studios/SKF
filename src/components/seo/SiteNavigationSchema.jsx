import { menus } from "@/helper/menuData";
import { Const } from "@/utils/Constant";
import React from "react";

const SiteNavigationSchema = () => {
  const schemaData = menus.flatMap((menu) => {
    const items = [
      {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        name: menu.name,
        url: `${Const.ClientLink}${menu.link}`,
      },
    ];

    if (menu.subItems && Array.isArray(menu.subItems)) {
      menu.subItems.forEach((sub) => {
        if (sub.name !== "All") {
          items.push({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: sub.name,
            url: `${Const.ClientLink}${sub.link}`,
          });
        }
      });
    }

    return items;
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    ></script>
  );
};

export default SiteNavigationSchema;
