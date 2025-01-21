import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMovieInput = {
  overview: Scalars['String']['input'];
  release_date: Scalars['String']['input'];
  runtime: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

/** The Movie Model */
export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID']['output'];
  /** Overview of movie. */
  overview?: Maybe<Scalars['String']['output']>;
  /** Date Movie was released */
  release_date: Scalars['String']['output'];
  /** Movie length in minutes. */
  runtime: Scalars['Float']['output'];
  /** Title of Movie */
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  deleteMovie: Scalars['Boolean']['output'];
  updateMovie: Movie;
};


export type MutationCreateMovieArgs = {
  data: CreateMovieInput;
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateMovieArgs = {
  id: Scalars['Float']['input'];
  options: UpdateMovieInput;
};

export type PaginatedMovies = {
  __typename?: 'PaginatedMovies';
  count: Scalars['Float']['output'];
  movies: Array<Movie>;
};

export type Query = {
  __typename?: 'Query';
  movie?: Maybe<Movie>;
  movies?: Maybe<PaginatedMovies>;
};


export type QueryMovieArgs = {
  id: Scalars['Float']['input'];
};


export type QueryMoviesArgs = {
  limit: Scalars['Float']['input'];
  skip: Scalars['Float']['input'];
};

export type UpdateMovieInput = {
  overview?: InputMaybe<Scalars['String']['input']>;
  release_date?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMovieMutationVariables = Exact<{
  data: CreateMovieInput;
}>;


export type CreateMovieMutation = { __typename?: 'Mutation', createMovie: { __typename?: 'Movie', id: string, title: string, release_date: string, overview?: string | null, runtime: number } };

export type UpdateMovieMutationVariables = Exact<{
  input: UpdateMovieInput;
  id: Scalars['Float']['input'];
}>;


export type UpdateMovieMutation = { __typename?: 'Mutation', updateMovie: { __typename?: 'Movie', id: string, title: string, release_date: string, overview?: string | null, runtime: number } };

export type MovieQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type MovieQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', id: string, title: string, release_date: string, overview?: string | null, runtime: number } | null };

export type MoviesQueryVariables = Exact<{
  limit: Scalars['Float']['input'];
  skip: Scalars['Float']['input'];
}>;


export type MoviesQuery = { __typename?: 'Query', movies?: { __typename?: 'PaginatedMovies', count: number, movies: Array<{ __typename?: 'Movie', id: string, title: string, release_date: string, overview?: string | null, runtime: number }> } | null };


export const CreateMovieDocument = gql`
    mutation CreateMovie($data: CreateMovieInput!) {
  createMovie(data: $data) {
    id
    title
    release_date
    overview
    runtime
  }
}
    `;
export type CreateMovieMutationFn = Apollo.MutationFunction<CreateMovieMutation, CreateMovieMutationVariables>;

/**
 * __useCreateMovieMutation__
 *
 * To run a mutation, you first call `useCreateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovieMutation, { data, loading, error }] = useCreateMovieMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMovieMutation(baseOptions?: Apollo.MutationHookOptions<CreateMovieMutation, CreateMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMovieMutation, CreateMovieMutationVariables>(CreateMovieDocument, options);
      }
export type CreateMovieMutationHookResult = ReturnType<typeof useCreateMovieMutation>;
export type CreateMovieMutationResult = Apollo.MutationResult<CreateMovieMutation>;
export type CreateMovieMutationOptions = Apollo.BaseMutationOptions<CreateMovieMutation, CreateMovieMutationVariables>;
export const UpdateMovieDocument = gql`
    mutation UpdateMovie($input: UpdateMovieInput!, $id: Float!) {
  updateMovie(options: $input, id: $id) {
    id
    title
    release_date
    overview
    runtime
  }
}
    `;
export type UpdateMovieMutationFn = Apollo.MutationFunction<UpdateMovieMutation, UpdateMovieMutationVariables>;

/**
 * __useUpdateMovieMutation__
 *
 * To run a mutation, you first call `useUpdateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovieMutation, { data, loading, error }] = useUpdateMovieMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMovieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMovieMutation, UpdateMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(UpdateMovieDocument, options);
      }
export type UpdateMovieMutationHookResult = ReturnType<typeof useUpdateMovieMutation>;
export type UpdateMovieMutationResult = Apollo.MutationResult<UpdateMovieMutation>;
export type UpdateMovieMutationOptions = Apollo.BaseMutationOptions<UpdateMovieMutation, UpdateMovieMutationVariables>;
export const MovieDocument = gql`
    query Movie($id: Float!) {
  movie(id: $id) {
    id
    title
    release_date
    overview
    runtime
  }
}
    `;

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovieQuery(baseOptions: Apollo.QueryHookOptions<MovieQuery, MovieQueryVariables> & ({ variables: MovieQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, options);
      }
export function useMovieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MovieQuery, MovieQueryVariables>(MovieDocument, options);
        }
export function useMovieSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MovieQuery, MovieQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MovieQuery, MovieQueryVariables>(MovieDocument, options);
        }
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieSuspenseQueryHookResult = ReturnType<typeof useMovieSuspenseQuery>;
export type MovieQueryResult = Apollo.QueryResult<MovieQuery, MovieQueryVariables>;
export const MoviesDocument = gql`
    query Movies($limit: Float!, $skip: Float!) {
  movies(limit: $limit, skip: $skip) {
    count
    movies {
      id
      title
      release_date
      overview
      runtime
    }
  }
}
    `;

/**
 * __useMoviesQuery__
 *
 * To run a query within a React component, call `useMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useMoviesQuery(baseOptions: Apollo.QueryHookOptions<MoviesQuery, MoviesQueryVariables> & ({ variables: MoviesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
      }
export function useMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
        }
export function useMoviesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
        }
export type MoviesQueryHookResult = ReturnType<typeof useMoviesQuery>;
export type MoviesLazyQueryHookResult = ReturnType<typeof useMoviesLazyQuery>;
export type MoviesSuspenseQueryHookResult = ReturnType<typeof useMoviesSuspenseQuery>;
export type MoviesQueryResult = Apollo.QueryResult<MoviesQuery, MoviesQueryVariables>;