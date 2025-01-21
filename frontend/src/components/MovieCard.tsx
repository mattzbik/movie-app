import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImage from '../public/default.jpg';

interface MovieProps {
  id: string;
  title: string;
  image?: string;
}

export const MovieCard: React.FC<MovieProps> = ({ image, title, id }) => (
  <Card sx={{ maxWidth: 300, maxHeight: 420 }} raised>
    <CardActionArea>
      <Link href={'/movie[id]'} as={`/movie/${id}`}>
        <Image
          src={image ?? placeholderImage}
          alt=""
          style={{ width: '100%', height: '100%' }}
        />
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {title}
          </Typography>
        </CardContent>
      </Link>
    </CardActionArea>
  </Card>
);
