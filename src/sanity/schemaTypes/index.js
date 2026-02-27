import { blockContentType } from './blockContentType'
import { upcomingReleaseType } from './upcomingReleaseType'
import { blogType } from './blogType'
import { movieType } from './movieType'
import { filmographyType } from './filmographyType'
import { galleryAlbumType } from './galleryAlbumType'

export const schema = {
  types: [blockContentType, upcomingReleaseType, blogType, movieType, filmographyType, galleryAlbumType],
}
