import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const movieType = defineType({
    name: "movies",
    title: "Movies",
    type: "document",

    // 👇 enables ordering
    orderings: [orderRankOrdering],

    fields: [
        // 👇 required for drag sorting
        orderRankField({ type: 'movies' }),
        // 🎬 Movie Title (ALWAYS)
        defineField({
            name: "title",
            title: "Movie Title",
            type: "string",
            validation: Rule => Rule.required(),
        }),

        // 📅 Release Year (ALWAYS)
        defineField({
            name: "year",
            title: "Release Year",
            type: "number",
            validation: Rule => Rule.required(),
        }),

        // 🏷 Category (ALWAYS)
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            initialValue: "released",
            options: {
                list: [
                    { title: "Released", value: "released" },
                    { title: "Upcoming", value: "upcoming" },
                ],
                layout: "radio",
            },
            validation: Rule => Rule.required(),
        }),

        // 🖼 Poster (ALWAYS)
        defineField({
            name: "poster",
            title: "Poster",
            type: "image",
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),

        // 🎞 Background Video (Upcoming + Released)
        defineField({
            name: "backgroundVideo",
            title: "Background Video",
            type: "file",
            options: {
                accept: "video/*",
            },
            // 👇 show for both categories
            hidden: ({ document }) => !document?.category,
            validation: Rule =>
                Rule.custom((value, ctx) => {
                    if (!ctx.document?.category) return true;

                    // required only for upcoming
                    if (ctx.document.category === "upcoming" && !value?.asset) {
                        return "Background video is required for upcoming movies";
                    }

                    // optional for released
                    return true;
                }),
        }),

        // 🔗 Slug (RELEASED ONLY)
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" && !value?.current
                        ? "Slug is required for released movies"
                        : true
                ),
        }),

        // 🎬 Director (RELEASED ONLY)
        defineField({
            name: "director",
            title: "Director",
            type: "string",
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" && !value
                        ? "Director is required"
                        : true
                ),
        }),

        // 🎞 Produced By (RELEASED ONLY)
        defineField({
            name: "produced",
            title: "Produced By",
            type: "string",
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" && !value
                        ? "Producer is required"
                        : true
                ),
        }),

        // 📝 Synopsis (RELEASED ONLY)
        defineField({
            name: "synopsis",
            title: "Synopsis",
            type: "text",
            rows: 4,
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" && !value
                        ? "Synopsis is required"
                        : true
                ),
        }),

        // 🎥 Teaser (RELEASED ONLY – optional, YouTube only)
        defineField({
            name: "teaser",
            title: "Teaser URL",
            type: "url",
            description: "Optional. YouTube URL only",
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) => {
                    // optional → allow empty
                    if (!value) return true;

                    const isYouTube =
                        value.includes("youtube.com") || value.includes("youtu.be");

                    return isYouTube ? true : "Only YouTube URLs are allowed";
                }),
        }),

        // 🎬 Trailer (RELEASED ONLY – optional, YouTube only)
        defineField({
            name: "trailer",
            title: "Trailer URL",
            type: "url",
            description: "Optional. YouTube URL only",
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) => {
                    // optional → allow empty
                    if (!value) return true;

                    const isYouTube =
                        value.includes("youtube.com") || value.includes("youtu.be");

                    return isYouTube ? true : "Only YouTube URLs are allowed";
                }),
        }),

        // 🎭 Cast & Crew (RELEASED ONLY)
        defineField({
            name: "cast",
            title: "Cast & Crew",
            type: "array",
            hidden: ({ document }) => document?.category === "upcoming",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "name", type: "string", title: "Name" },
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                            options: { hotspot: true },
                        },
                    ],
                },
            ],
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" &&
                        (!value || value.length === 0)
                        ? "At least one cast member is required"
                        : true
                ),
        }),

        // ▶ Watch Now (RELEASED ONLY)
        defineField({
            name: "watchNow",
            title: "Watch Now",
            type: "array",
            hidden: ({ document }) => document?.category === "upcoming",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Netflix", value: "netflix" },
                                    { title: "Prime Video", value: "prime" },
                                    { title: "Zee", value: "zee" },
                                ],
                                layout: "radio", // optional, cleaner UX
                            },
                        }),
                        defineField({
                            name: "url",
                            title: "URL",
                            type: "url",
                        }),
                    ],
                },
            ],
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" &&
                        (!value || value.length === 0)
                        ? "At least one watch platform is required"
                        : true
                ),
        }),

        // 🔍 SEO Meta (RELEASED ONLY – compact)
        defineField({
            name: "meta",
            title: "SEO Meta",
            type: "object",
            hidden: ({ document }) => document?.category === "upcoming",
            validation: Rule =>
                Rule.custom((value, ctx) =>
                    ctx.document?.category === "released" && !value
                        ? "SEO meta is required"
                        : true
                ),
            fields: [
                defineField({
                    name: "title",
                    title: "Meta Title",
                    type: "string",
                    description: "50–60 characters",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "description",
                    title: "Meta Description",
                    type: "text",
                    rows: 2, // 👈 small
                    description: "150–160 characters",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "keywords",
                    title: "Meta Keywords",
                    type: "text",
                    rows: 1, // 👈 very compact
                    description: "Comma-separated keywords",
                    validation: Rule => Rule.required(),
                }),
            ],
        }),
    ],

    preview: {
        select: {
            title: "title",
            subtitle: "year",
            media: "poster",
        },
    },
});