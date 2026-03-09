import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",

  // singleton behavior
  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Valid email is required"),
    }),

    defineField({
      name: "twitter",
      title: "Twitter URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }),
    }),

    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }),
    }),

    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Contact Page",
      };
    },
  },
});