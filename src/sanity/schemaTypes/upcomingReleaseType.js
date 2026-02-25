import {defineField, defineType} from 'sanity'

export const upcomingReleaseType = defineType({
  name: 'upcomingRelease',
  title: 'Upcoming Release',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Release Title',
      type: 'string',
      initialValue: 'Upcoming Release',
      validation: (Rule) => Rule.required(),
    }),

    // 🖥️ Desktop Banner (Required)
    defineField({
      name: 'desktopBanner',
      title: 'Desktop Banner',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload wide banner for desktop view',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // 📱 Mobile Banner (OPTIONAL)
    defineField({
      name: 'mobileBanner',
      title: 'Mobile Banner (Optional)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Optional: Upload vertical banner for mobile devices. If not provided, desktop banner will be used.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'desktopBanner',
    },
  },
})