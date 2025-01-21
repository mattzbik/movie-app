import { useMoviesQuery } from '@/generated/types';
import { HookResult } from '@/types/types';
import { useEffect, useState } from 'react';

interface MovieResponse {
  count: number;
  movies: Movie[];
}

interface Movie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  run_time: number;
}

export const useGetMoviesData = (
  limit: number,
  skip: number
): HookResult<MovieResponse> => {
  const [state, setState] = useState<HookResult<MovieResponse>>({
    data: null,
    loading: true,
    error: null,
  });

  const {
    data: moviesData,
    loading: moviesLoading,
    error: moviesError,
  } = useMoviesQuery({
    variables: { limit, skip },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (moviesLoading) {
      setState({ loading: true });
    }

    if (moviesError) {
      setState({ loading: false, error: moviesError });
    }

    if (moviesData) {
      const data = moviesData.movies;
      const movies = (data?.movies ?? []).reduce<Movie[]>((acc, curr) => {
        acc.push({
          id: curr.id ?? '',
          title: curr.title ?? '',
          overview: curr.overview ?? '',
          release_date: curr.release_date ?? '',
          run_time: curr.runtime,
        });
        return acc;
      }, []);

      setState({
        data: { count: data?.count ?? 0, movies },
        loading: false,
        error: null,
      });
    }
  }, [moviesData, moviesLoading, moviesError]);

  return state;
};
