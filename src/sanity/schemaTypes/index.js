import { blockContentType } from './blockContentType'
import { upcomingReleaseType } from './upcomingReleaseType'
import { blogType } from './blogType'
import { movieType } from './movieType'
import { filmographyType } from './filmographyType'
import { galleryAlbumType } from './galleryAlbumType'
import { homeTopMovieType } from './homeTopMovieType'
import { heroSectionType } from './heroSectionType'
import { homeDirectorSpotlightType } from './homeDirectorSpotlightType'
import { aboutHeroSectionType } from './aboutHeroSectionType'
import { homeAboutType } from './homeAboutType'

export const schema = {
  types: [blockContentType, heroSectionType, homeDirectorSpotlightType, homeTopMovieType, upcomingReleaseType, homeAboutType, aboutHeroSectionType, blogType, movieType, filmographyType, galleryAlbumType],
}
