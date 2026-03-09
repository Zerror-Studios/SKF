import { defineField, defineType } from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blogs',
  type: 'document',

  fields: [
    // 🔹 Blog Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value) =>
          value ? true : 'Blog title is required'
        ),
    }),

    // 🔹 Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((value) =>
          value?.current ? true : 'Slug is required'
        ),
    }),

    // 🗓️ Published Date
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'Blog publish date (used for sorting & SEO)',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) =>
        Rule.custom((value) =>
          value ? true : 'Published date is required'
        ),
    }),

    // 🔹 Short Description
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary of the blog (recommended: 20–30 words)',
      validation: (Rule) =>
        Rule.custom((value) =>
          value ? true : 'Short description is required'
        ),
    }),

    // 🔹 Featured Image
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: "Recommended banner size: approx. 1920 × 1080 px. Max file size: 500KB.",
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          validation: (Rule) =>
            Rule.custom((value) =>
              value ? true : 'Alt text is required'
            ),
        },
      ],
      validation: (Rule) =>
        Rule.custom((value) =>
          value?.asset ? true : 'Featured image is required'
        ),
    }),

    // 🔹 Reading Time
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'Example: 2 Minutes',
      validation: (Rule) =>
        Rule.custom((value) =>
          value ? true : 'Reading time is required'
        ),
    }),

    // 🔹 Blog Content (Multiple Paragraphs)
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      description: "Blog content with bold, italic and hyperlink support",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Hyperlink",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((value) =>
          value && value.length > 0 ? true : "Blog content is required"
        ),
    }),

    // 🔹 SEO Meta
    defineField({
      name: 'meta',
      title: 'SEO Meta',
      type: 'object',
      validation: (Rule) =>
        Rule.custom((value) =>
          value ? true : 'SEO meta information is required'
        ),
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title',
          type: 'string',
          description: 'Recommended: 50–60 characters',
          validation: (Rule) =>
            Rule.custom((value) =>
              value ? true : 'Meta title is required'
            ),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Recommended: 150–160 characters',
          validation: (Rule) =>
            Rule.custom((value) =>
              value ? true : 'Meta description is required'
            ),
        }),
        defineField({
          name: 'keywords',
          title: 'Meta Keywords',
          type: 'text',
          rows: 2,
          description:
            'Comma-separated keywords (recommended: 5–10 words). Example: Sikander movie, Karthi film, Siva director, Tamil cinema, movie review',
          validation: (Rule) =>
            Rule.custom((value) =>
              value ? true : 'Meta keywords are required'
            ),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})

