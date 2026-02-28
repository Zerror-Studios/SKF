import { blockContentType } from './blockContentType'
import { upcomingReleaseType } from './upcomingReleaseType'
import { blogType } from './blogType'
import { movieType } from './movieType'
import { filmographyType } from './filmographyType'
import { galleryAlbumType } from './galleryAlbumType'
import { homeTopMovieType } from './homeTopMovieType'

export const schema = {
  types: [blockContentType,homeTopMovieType, upcomingReleaseType, blogType, movieType, filmographyType, galleryAlbumType],
}
