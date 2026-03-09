import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const movieType = defineType({
    name: "movies",
    title: "Movies",
    type: "document",

    orderings: [orderRankOrdering],

    fields: [
        orderRankField({ type: "movies" }),

        // 🎬 Title (REQUIRED)
        defineField({
            name: "title",
            title: "Movie Title",
            type: "string",
            validation: Rule => Rule.required(),
        }),

        // 📅 Year (REQUIRED)
        defineField({
            name: "year",
            title: "Release Year",
            type: "number",
            validation: Rule => Rule.required(),
        }),

        // 🏷 Category (optional but useful)
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
        }),

        // 🖼 Poster (REQUIRED)
        defineField({
            name: "poster",
            title: "Poster",
            type: "image",
            description: "Recommended banner size: approx. 1920 × 1080 px. Max file size: 500KB.",
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),

        // 🎞 Background Video (REQUIRED)
        defineField({
            name: "backgroundVideo",
            title: "Background Video",
            type: "file",
            description: "Max file size 2mb (1-2 second video)",
            options: { accept: "video/*" },
            validation: Rule => Rule.required(),
        }),

        // 🔗 Slug (REQUIRED)
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            validation: Rule => Rule.required(),
        }),

        // 🎬 Director (REQUIRED)
        defineField({
            name: "director",
            title: "Director",
            type: "string",
            validation: Rule => Rule.required(),
        }),

        // 🎞 Produced By (REQUIRED)
        defineField({
            name: "produced",
            title: "Produced By",
            type: "string",
            validation: Rule => Rule.required(),
        }),

        // 🎭 Genre (REQUIRED) ✅ NEW FIELD
        defineField({
            name: "genre",
            title: "Genre",
            type: "string",
            description: "Example: Action | Thriller",
        }),

        // 📝 Synopsis (OPTIONAL)
        defineField({
            name: "synopsis",
            title: "Synopsis",
            type: "text",
            rows: 4,
        }),

        // 🎥 Teaser (OPTIONAL – YouTube only)
        defineField({
            name: "teaser",
            title: "Teaser URL",
            type: "url",
            validation: Rule =>
                Rule.custom(value => {
                    if (!value) return true;
                    return value.includes("youtube.com") || value.includes("youtu.be")
                        ? true
                        : "Only YouTube URLs allowed";
                }),
        }),

        // 🎬 Trailer (OPTIONAL – YouTube only)
        defineField({
            name: "trailer",
            title: "Trailer URL",
            type: "url",
            validation: Rule =>
                Rule.custom(value => {
                    if (!value) return true;
                    return value.includes("youtube.com") || value.includes("youtu.be")
                        ? true
                        : "Only YouTube URLs allowed";
                }),
        }),

        // 🎭 Cast & Crew (OPTIONAL)
        defineField({
            name: "cast",
            title: "Cast & Crew",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "name", title: "Name", type: "string" },
                        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
                    ],
                },
            ],
        }),

        // ▶ Watch Now (OPTIONAL)
        defineField({
            name: "watchNow",
            title: "Watch Now",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Netflix", value: "netflix" },
                                    { title: "Prime Video", value: "prime" },
                                    { title: "Zee", value: "zee" },
                                    { title: "YouTube", value: "youtube" },
                                    { title: "Hotstar", value: "hotstar" },
                                ],
                                layout: "radio",
                            },
                        },
                        { name: "url", title: "URL", type: "url" },
                    ],
                },
            ],
        }),

        // 🔍 SEO Meta (OPTIONAL)
        defineField({
            name: "meta",
            title: "SEO Meta",
            type: "object",
            fields: [
                { name: "title", title: "Meta Title", type: "string" },
                { name: "description", title: "Meta Description", type: "text", rows: 2 },
                { name: "keywords", title: "Meta Keywords", type: "text", rows: 1 },
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