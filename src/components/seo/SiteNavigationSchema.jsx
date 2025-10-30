import { menus } from "@/helper/menuData";
import { Const } from "@/utils/Constant";

const SiteNavigationSchema = () => {
  const hasPart = [];

  menus.forEach((menu) => {
    hasPart.push({
      "@type": "SiteNavigationElement",
      name: menu.name,
      url: `${Const.ClientLink}${menu.link}`,
    });

    if (menu.sublinks && menu.sublinks.length > 0) {
      menu.sublinks.forEach((sublink) => {
        if (sublink.name.toLowerCase() !== "all") {
          hasPart.push({
            "@type": "SiteNavigationElement",
            name: sublink.name,
            url: `${Const.ClientLink}${sublink.link}`,
          });
        }
      });
    }
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Koraput Cultural Heritage",
    url: Const.ClientLink,
    hasPart: hasPart,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SiteNavigationSchema;
