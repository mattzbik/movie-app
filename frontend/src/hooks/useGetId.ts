'use client';

import { useParams } from 'next/navigation';

export const useGetId = () => {
  return useParams<{ id: string }>().id;
};
