import { ApolloError } from '@apollo/client';

export interface HookResult<T> {
  data?: T | null;
  loading: boolean;
  error?: ApolloError | null;
}

export interface Movie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  run_time: number;
}
