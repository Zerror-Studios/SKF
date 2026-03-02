import { defineType, defineField } from "sanity";

export const homeDirectorSpotlightType = defineType({
  name: "homeDirectorSpotlight",
  title: "Home – Director Spotlight",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Director Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Director name is required"),
    }),

    defineField({
      name: "directorOf",
      title: "Director Of",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Movie / project name is required"),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Max 20 words",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const count = value?.trim().split(/\s+/).length || 0;
          return count <= 20 || `Max 20 words (currently ${count})`;
        }),
    }),

    defineField({
      name: "image",
      title: "Director Image",
      type: "image",
      description: "Max file size 500KB",
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.required().error("Director image is required"),
    }),
  ],
});