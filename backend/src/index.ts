/* eslint-disable no-console */
import express from 'express';
import { AppDataSource } from './data-source';
import { moviesRouter } from './routes/movies';
import { setupSwagger } from './swagger';

const app = express();
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Welcome to the Personal Movie API');
});

app.use('/', moviesRouter);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
