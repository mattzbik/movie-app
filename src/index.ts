/* eslint-disable no-console */
import express from 'express';
import { AppDataSource } from './data-source';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.get('/', (_, res) => {
  res.send('Welcome to the Personal Movie API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
