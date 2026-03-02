import { defineField, defineType } from "sanity";

export const upcomingReleaseType = defineType({
  name: "upcomingRelease",
  title: "Upcoming Release",
  type: "document",

  // 🔒 singleton behavior (no create / delete)
  __experimental_actions: ["update", "publish"],

  fields: [
    // 🎬 Movie Title
    defineField({
      name: "movieTitle",
      title: "Movie Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 🖥️ Desktop Banner (Required)
    defineField({
      name: "desktopBanner",
      title: "Desktop Banner",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || !value.asset) {
            return "Desktop banner is required";
          }
          return true;
        }),
    }),

    // 📱 Mobile Banner (Optional)
    defineField({
      name: "mobileBanner",
      title: "Mobile Banner (Optional)",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "movieTitle",
      media: "desktopBanner",
    },
  },
});