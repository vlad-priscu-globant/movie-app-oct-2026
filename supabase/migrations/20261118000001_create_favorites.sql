-- Matches the deployed public.favorites table and RLS policies
CREATE TABLE IF NOT EXISTS public.favorites (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL DEFAULT auth.uid(),
  movie_id bigint NOT NULL,
  PRIMARY KEY (user_id, movie_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite movies"
  ON public.favorites
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add a movie to their favorites"
  ON public.favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their favorite movies"
  ON public.favorites
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove a movie from their favorites"
  ON public.favorites
  FOR DELETE
  USING (auth.uid() = user_id);
