'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.jsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { previewAction } from './src/sanity/actions/previewAction'

export default defineConfig({
  title: 'Salman Khan Films',
  basePath: '/studio',
  projectId,
  dataset,
  schema,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

document: {
  actions: (prev, context) => {
    if (context.schemaType === 'blog' || context.schemaType === 'movies') {
      return [...prev, previewAction];
    }
    return prev;
  },
},
})
