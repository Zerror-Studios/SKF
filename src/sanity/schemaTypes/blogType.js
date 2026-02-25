import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',

  fields: [
    // 🔹 Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),

    // 🔹Short Description
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Cover Image
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 ISO Publish Date
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Reading Time
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'Example: 2 Minutes',
    }),

    // 🔹 Blog Content (array of paragraphs)
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 SEO Meta
    defineField({
      name: 'meta',
      title: 'SEO Meta',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Meta Title'},
        {name: 'description', type: 'text', title: 'Meta Description'},
        {name: 'keywords', type: 'text', title: 'Keywords'},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'date',
    },
  },
})