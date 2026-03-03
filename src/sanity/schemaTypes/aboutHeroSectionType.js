import { defineType, defineField } from "sanity";

export const aboutHeroSectionType = defineType({
  name: "aboutHeroSection",
  title: "About – Hero Section",
  type: "document",

  // 🔒 singleton behavior
  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 About Hero Description (Multiple Paragraphs)
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Write description in multiple paragraphs",
      validation: (Rule) =>
        Rule.custom((value) =>
          value && value.length > 0
            ? true
            : "Description is required"
        ),
    }),

    defineField({
      name: "headOffice",
      title: "Head Office",
      type: "string",
      description: "Example: Mumbai, India",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "totalMovies",
      title: "Total Movies",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "banner",
      title: "Hero Banner",
      type: "image",
      description: "Recommended banner size: approx. 1920 × 814 px. Max file size: 500KB.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // 🏷 Banner Alt Text (NEW)
    defineField({
      name: "bannerAlt",
      title: "Banner Alt Text",
      type: "string",
      description: "Accessibility text for banner image",
      validation: (Rule) =>
        Rule.required().error("Banner alt text is required"),
    }),
  ],
});