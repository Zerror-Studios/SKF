import { defineField, defineType } from "sanity";

export const filmographyType = defineType({
  name: "filmography",
  title: "Filmography",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Movie Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "year",
      title: "Release Year",
      type: "number",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "director",
      title: "Director",
      type: "string",
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      year: "year",
    },
    prepare({ title, year }) {
      return {
        title,
        subtitle: year,
      };
    },
  },
});