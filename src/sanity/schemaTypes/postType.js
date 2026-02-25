import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,

  // 👇 enables ordering
  orderings: [orderRankOrdering],

  fields: [
    // 👇 required for drag sorting
    orderRankField({type: 'post'}),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),

    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})