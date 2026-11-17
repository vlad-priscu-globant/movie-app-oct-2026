import { z } from 'zod'

/**
 * Domain contracts shared by the Nitro server and the Vue app.
 * Zod schemas are the single source of truth, and the TS types are inferred from them.
 */

export const movieIdSchema = z.coerce.number().int().positive()

export const movieSchema = z.object({
  id: movieIdSchema,
  title: z.string().min(1),
  /** `null` when the release date is unknown. The UI shows a placeholder instead. */
  year: z.number().int().nullable(),
  /** Absolute poster URL, or an empty string when there is no poster. */
  image: z.string(),
})

export type Movie = z.infer<typeof movieSchema>

export const movieDetailSchema = movieSchema.extend({
  overview: z.string(),
  backdropImage: z.string(),
  voteAverage: z.number(),
  runtime: z.number(),
  genres: z.array(z.string()),
})

export type MovieDetail = z.infer<typeof movieDetailSchema>

export const movieIdParamsSchema = z.object({ id: movieIdSchema })

export type MovieIdParams = z.infer<typeof movieIdParamsSchema>

export interface FavoriteStatus {
  isFavorite: boolean
}
