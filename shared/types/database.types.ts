/**
 * Typed Supabase schema contract matching the live `public.favorites` table.
 * Kept strictly typed (zero `any`) in compliance with project conventions.
 */
export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          user_id: string
          movie_id: number
        }
        Insert: {
          user_id?: string
          movie_id: number
        }
        Update: {
          user_id?: string
          movie_id?: number
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
