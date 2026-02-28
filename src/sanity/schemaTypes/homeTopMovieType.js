import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const homeTopMovieType = defineType({
  name: "homeTopMovie",
  title: "Home – Top Movie",
  type: "document",

   // 👇 enables ordering
      orderings: [orderRankOrdering],

  fields: [
     // 👇 required for drag sorting
            orderRankField({ type: 'homeTopMovie' }),
    // 🎬 Select One Movie
    defineField({
      name: "movie",
      title: "Select Movie",
      type: "reference",
      to: [{ type: "movies" }],
      options: {
        filter: 'category == "released"', // only released movies
      },
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "movie.title",
      media: "movie.poster",
    },
    prepare({ title, media }) {
      return {
        title: title || "Home – Top Movie",
        media,
      };
    },
  },
});