import { Search as SearchIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export const AppHeader = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Container
      maxWidth="lg"
      sx={{
        background: 'lightgrey',
        p: 4,
      }}
    >
      <AppBar
        position="static"
        color="inherit"
        sx={{ borderRadius: 2, p: 1, whiteSpace: 'nowrap' }}
      >
        <Toolbar>
          <Typography variant="h4" mr={2}>
            Movie App
          </Typography>
          <TextField
            variant="outlined"
            sx={{ width: '100%', minWidth: 200 }}
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
          <Box
            mr={1}
            sx={{
              display: 'flex',
              '& button': {
                textTransform: 'none',
                mx: 2,
              },
            }}
          >
            <Button onClick={() => router.push('/')}>Home</Button>
            <Button onClick={() => console.log('go to movies page')}>
              Movies
            </Button>
            <Button onClick={() => console.log('go to tv shows page')}>
              TV Shows
            </Button>
            <Button onClick={() => console.log('go to dashboard page')}>
              Dashboard
            </Button>
            <Button onClick={() => console.log('go to login page')}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ p: 3 }}>
        {children}
      </Container>
    </Container>
  );
};
