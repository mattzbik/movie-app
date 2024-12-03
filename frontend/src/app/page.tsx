'use client';
import { MovieCard } from '@/components/MovieCard';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid2,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        background: 'lightgrey',
        p: 4,
      }}
    >
      <AppBar position="static" color="inherit" sx={{ borderRadius: 2, p: 1 }}>
        <Toolbar>
          <Typography variant="h4" mr={2} flexGrow={1}>
            Movie App
          </Typography>

          <Box mr={1} sx={{ '& button': { textTransform: 'none', mx: 2 } }}>
            <Button>Movies</Button>
            <Button>TV Shows</Button>
            <Button>Dashboard</Button>
            <Button>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component={'main'} sx={{ p: 3 }}>
        <TextField
          variant="outlined"
          sx={{ display: 'flex' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Grid2 container spacing={4} sx={{ my: 2 }}>
          {[
            { title: 'Movie 1' },
            { title: 'Movie 2' },
            { title: 'Movie 3' },
            { title: 'Movie 4' },
            { title: 'Movie 5' },
            { title: 'Movie 6' },
            { title: 'Movie 7' },
            { title: 'Movie 8' },
            { title: 'Movie 9' },
          ].map((c, i) => (
            <Grid2 key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard key={i} title={c.title} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Container>
  );
}
