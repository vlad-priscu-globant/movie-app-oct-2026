import type { Movie, MovieDetail } from '#shared/types/movie'
import type { TmdbMovie } from './tmdb'

/** The one place that knows how TMDB image URLs are built. */
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

type TmdbImageSize = 'w500' | 'w1280'

function toTmdbImageUrl(path: string | null | undefined, size: TmdbImageSize): string {
  return path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : ''
}

function parseReleaseYear(releaseDate: string | null | undefined): number | null {
  const year = Number.parseInt(releaseDate?.slice(0, 4) ?? '', 10)
  return Number.isNaN(year) ? null : year
}

export function toMovie(raw: TmdbMovie): Movie {
  return {
    id: raw.id,
    title: raw.title,
    year: parseReleaseYear(raw.release_date),
    image: toTmdbImageUrl(raw.poster_path, 'w500'),
  }
}

export function toMovieDetail(raw: TmdbMovie): MovieDetail {
  return {
    ...toMovie(raw),
    overview: raw.overview ?? '',
    backdropImage: toTmdbImageUrl(raw.backdrop_path, 'w1280'),
    voteAverage: raw.vote_average ?? 0,
    runtime: raw.runtime ?? 0,
    genres: raw.genres?.map((genre) => genre.name) ?? [],
  }
}
