import { Const } from "@/utils/Constant";

export const previewAction = (props) => {
  const { draft, published, type } = props;
  const doc = draft || published;

  if (!doc?.slug?.current) return null;

  const basePath = type === "blog" ? "/news" : "/movies";

  const url = `${Const.ClientLink}/api/preview?slug=${basePath}/${doc.slug.current}`;

  return {
    label: "Open Preview",
    onHandle: () => {
      window.open(url, "_blank");
    },
  };
};