import { ApolloError } from '@apollo/client';

export interface HookResult<T> {
  data?: T | null;
  loading: boolean;
  error?: ApolloError | null;
}
