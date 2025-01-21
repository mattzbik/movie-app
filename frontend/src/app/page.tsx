'use client';
import { AppHeader } from '@/components/AppHeader';
import { MovieCard } from '@/components/MovieCard';
import { useGetMoviesData } from '@/hooks/useGetMoviesData';
import { Grid2 } from '@mui/material';

export default function Home() {
  const { data, loading, error } = useGetMoviesData(10, 0);

  return (
    <AppHeader>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <Grid2 container spacing={4} sx={{ my: 2 }}>
          {data.movies.map((m, i) => (
            <Grid2 key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard key={i} title={m.title} id={m.id} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </AppHeader>
  );
}
