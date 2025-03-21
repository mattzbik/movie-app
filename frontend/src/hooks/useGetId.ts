'use client';

import { useParams } from 'next/navigation';

export const useGetId = () => {
  return parseInt(useParams<{ id: string }>().id);
};
