import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const galleryAlbumType = defineType({
  name: "galleryAlbum",
  title: "Gallery Albums",
  type: "document",

  // 👇 enables ordering
  orderings: [orderRankOrdering],

  fields: [
    // 👇 required for drag sorting
    orderRankField({ type: "galleryAlbum" }),

    // 📛 Album Title
    defineField({
      name: "title",
      title: "Album Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 🔗 Album Slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Use the SAME slug as the movie if this album belongs to a movie page.",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    // 🖼 Album Cover
    defineField({
      name: "cover",
      title: "Album Cover",
      type: "image",
      description: "Max file size 500KB",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // 📁 Sub Albums
    defineField({
      name: "subAlbums",
      title: "Sub Albums",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            // 🧩 Sub Album Title
            defineField({
              name: "title",
              title: "Sub Album Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            // 🔗 Sub Album Slug
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (_, context) => context.parent?.title,
              },
              validation: (Rule) => Rule.required(),
            }),

            // 🖼 Sub Album Cover
            defineField({
              name: "cover",
              title: "Cover Image",
              type: "image",
              description: "Max file size ",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),

            // 🎞 Media (IMAGE / VIDEO with explicit type)
            defineField({
              name: "media",
              title: "Media",
              type: "array",
              validation: (Rule) => Rule.required().min(1),
              of: [
                {
                  type: "object",
                  name: "mediaItem",
                  fields: [
                    // 👇 Explicit media type
                    defineField({
                      name: "type",
                      title: "Media Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Image", value: "image" },
                          { title: "YouTube Video", value: "video" },
                        ],
                        layout: "radio",
                      },
                      validation: (Rule) => Rule.required(),
                    }),

                    // 🖼 Image field
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                      description: "Max file size 500KB",
                      options: { hotspot: true },
                      hidden: ({ parent }) => parent?.type !== "image",
                    }),

                    // 🎥 YouTube URL field
                    defineField({
                      name: "videoUrl",
                      title: "YouTube URL",
                      type: "url",
                      validation: (Rule) =>
                        Rule.uri({ scheme: ["http", "https"] }),
                      hidden: ({ parent }) => parent?.type !== "video",
                    }),
                  ],

                  preview: {
                    select: {
                      type: "type",
                      image: "image",
                      videoUrl: "videoUrl",
                    },
                    prepare({ type, image, videoUrl }) {
                      return {
                        title: type === "image" ? "Image" : "YouTube Video",
                        subtitle: type === "video" ? videoUrl : "",
                        media: image,
                      };
                    },
                  },
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "cover",
    },
  },
});