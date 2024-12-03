import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

interface MovieProps {
  title: string;
  image?: string;
}

export const MovieCard: React.FC<MovieProps> = ({ image, title }) => (
  <Card sx={{ maxWidth: 300 }} raised>
    <CardActionArea>
      <CardMedia component="img" height={300} image={image} />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
