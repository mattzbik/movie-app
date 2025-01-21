'use client';

import { AppHeader } from '@/components/AppHeader';
import { useGetId } from '@/hooks/useGetId';
import { Card } from '@mui/material';

interface MovieProps {
  id: string;
}

const Movie: React.FC<MovieProps> = ({}) => {
  const id = useGetId();
  return (
    <AppHeader>
      <Card>{id} Test Page</Card>
    </AppHeader>
  );
};

export default Movie;
