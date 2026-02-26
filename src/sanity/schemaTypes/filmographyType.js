import { defineField, defineType } from "sanity";

export const filmographyType = defineType({
  name: "filmography",
  title: "Filmography",
  type: "document",

  fields: [
    defineField({
      name: "films",
      title: "Films",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            // 🔗 Select existing Movie (optional)
            defineField({
              name: "movie",
              title: "Select Movie (Optional)",
              type: "reference",
              to: [{ type: "movies" }],
              description:
                "Select if this film already exists in Movies. Leave empty to add manually.",
            }),

            // 🎬 Manual Title (ONLY if no movie selected)
            defineField({
              name: "title",
              title: "Movie Title",
              type: "string",
              hidden: ({ parent }) => !!parent?.movie,
              validation: Rule =>
                Rule.custom((value, ctx) =>
                  !ctx.parent?.movie && !value
                    ? "Movie title is required if no movie is selected"
                    : true
                ),
            }),

            // 📅 Manual Year (ONLY if no movie selected)
            defineField({
              name: "year",
              title: "Release Year",
              type: "number",
              hidden: ({ parent }) => !!parent?.movie,
              validation: Rule =>
                Rule.custom((value, ctx) =>
                  !ctx.parent?.movie && !value
                    ? "Release year is required if no movie is selected"
                    : true
                ),
            }),

            // 🎬 Manual Director (ONLY if no movie selected)
            defineField({
              name: "director",
              title: "Director",
              type: "string",
              hidden: ({ parent }) => !!parent?.movie,
              validation: Rule =>
                Rule.custom((value, ctx) =>
                  !ctx.parent?.movie && !value
                    ? "Director is required if no movie is selected"
                    : true
                ),
            }),
          ],

          preview: {
            select: {
              movieTitle: "movie.title",
              manualTitle: "title",
              yearFromMovie: "movie.year",
              manualYear: "year",
            },
            prepare({ movieTitle, manualTitle, yearFromMovie, manualYear }) {
              return {
                title: movieTitle || manualTitle,
                subtitle: yearFromMovie || manualYear,
              };
            },
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Filmography",
      };
    },
  },
});