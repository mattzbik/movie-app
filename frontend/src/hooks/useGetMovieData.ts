import { useMovieQuery } from '@/generated/types';
import { HookResult, Movie } from '@/types/types';
import { useEffect, useState } from 'react';

export const useGetMovieData = (id: number): HookResult<Movie> => {
  const [state, setState] = useState<HookResult<Movie>>({
    data: null,
    loading: true,
    error: null,
  });

  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
  } = useMovieQuery({ variables: { id } });

  useEffect(() => {
    if (movieLoading) {
      setState({ loading: true });
    }

    if (movieData) {
      // setState({ data: movieData, loading: false });
      const movie = movieData.movie;
      setState({
        data: {
          id: movie?.id ?? '',
          title: movie?.title ?? '',
          overview: movie?.overview ?? '',
          release_date: movie?.release_date ?? '',
          run_time: movie?.runtime ?? 0,
        },
        loading: false,
      });
    }

    if (movieError) {
      setState({ data: null, loading: false, error: movieError });
    }
  }, [movieData, movieError, movieLoading]);

  return state;
};
