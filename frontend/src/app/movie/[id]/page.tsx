'use client';

import { AppHeader } from '@/components/AppHeader';
import { useGetId } from '@/hooks/useGetId';
import { useGetMovieData } from '@/hooks/useGetMovieData';
import { Card, CardContent, Typography } from '@mui/material';

interface MovieProps {
  id: string;
}

const Movie: React.FC<MovieProps> = ({}) => {
  const id = useGetId();
  const { data, loading, error } = useGetMovieData(id);
  return (
    <AppHeader>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <Card>
          <CardContent>
            <Typography>id: {data.id}</Typography>
            <Typography>title: {data.title}</Typography>
            <Typography>overview: {data.overview}</Typography>
            <Typography>release_date: {data.release_date}</Typography>
            <Typography>run_time: {data.run_time}</Typography>
          </CardContent>
        </Card>
      )}
    </AppHeader>
  );
};

export default Movie;
