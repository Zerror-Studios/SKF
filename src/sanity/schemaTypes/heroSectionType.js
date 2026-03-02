import { defineType, defineField } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",

  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name: "video",
      title: "Hero Video",
      type: "file",
      description: " Upload MP4 video only. Maximum size: 15 MB",
      options: {
        accept: "video/mp4",
      },
      validation: (Rule) =>
        Rule.custom((file) => {
          if (!file?.asset?._ref) return true;
          // Sanity does not expose file size here reliably
          return true;
        }),
    }),

    defineField({
      name: "videoAlt",
      title: "Video Alt Text",
      type: "string",
      description: "Describe what is happening in the video",
    }),
  ],
});