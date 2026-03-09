import { defineField, defineType } from "sanity";

export const homeAboutType = defineType({
  name: "homeAbout",
  title: "Home About Section",
  type: "document",

  // 🔒 singleton behavior (no create / delete)
  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "text",
          rows: 4,
        },
      ],
      description: "Write content in multiple paragraphs",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one paragraph is required"),
    }),

    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Max file size: 500KB.",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Background image is required"),
    }),
  ],
});