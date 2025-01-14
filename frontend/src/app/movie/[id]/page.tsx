'use client';

import { useGetId } from '@/hooks/useGetId';
import { Card } from '@mui/material';

interface MovieProps {
  id: string;
}

const Movie: React.FC<MovieProps> = ({}) => {
  const id = useGetId();
  return <Card>{id} Test Page</Card>;
};

export default Movie;
