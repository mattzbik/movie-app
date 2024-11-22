import express from 'express';
import { AppDataSource } from '../../data-source';
import { Movie } from '../../entity/Movie';

export const moviesRouter = express.Router();

/**
 * @swagger
 * /v1/movies:
 *   get:
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                     format: date
 *                   overview:
 *                     type: string
 *                   runtime:
 *                     type: integer
 */
moviesRouter.get('/v1/movies', async (_, res) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  await movieRepository
    .find()
    .then((movies) => res.json(movies))
    .catch((error) => {
      res.status(500).json({ error });
    });
});

/**
 * @swagger
 * /v1/movies:
 *   post:
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_date:
 *                 type: string
 *                 format: date
 *               overview:
 *                 type: string
 *               runtime:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
moviesRouter.post('/v1/movies', async (req, res, next) => {
  const { title, release_date, overview, runtime } = req.body;

  const movieRepository = AppDataSource.getRepository(Movie);
  const movie = movieRepository.create({
    title,
    release_date,
    overview,
    runtime,
  });
  await movieRepository
    .save(movie)
    .then((movie) => res.status(201).json(movie))
    .catch((error) => {
      res.status(400).json({ error });
      next(error);
    });
});

/**
 * @swagger
 * /v1/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                     format: date
 *                   overview:
 *                     type: string
 *                   runtime:
 *                     type: integer
 *       404:
 *         description: Movie not found
 */
moviesRouter.get('/v1/movies/:id', async (req, res, next) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const id = parseInt(req.params.id);

  await movieRepository
    .findOneBy({
      id,
    })
    .then((movie) => {
      if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
        return;
      }
      res.status(200).json(movie);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
      next();
    });
});

/**
 * @swagger
 * /v1/movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_date:
 *                 type: string
 *                 format: date
 *               overview:
 *                 type: string
 *               runtime:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, invalid or missing data
 *       404:
 *         description: Movie not found
 */
moviesRouter.put('/v1/movies/:id', async (req, res, next) => {
  const { title, release_date, overview, runtime } = req.body;
  const movieRepository = AppDataSource.getRepository(Movie);
  const id = parseInt(req.params.id);

  const movie = await movieRepository.findOneBy({
    id,
  });

  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
  }

  await movieRepository
    .save({
      ...movie,
      title,
      release_date,
      overview,
      runtime,
    })
    .then((movie) => res.status(200).json(movie))
    .catch((error) => {
      res
        .status(400)
        .json({ error, message: 'Bad request, invalid or missing data.' });
      next();
    });
});

/**
 * @swagger
 * /v1/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Something went wrong
 */
moviesRouter.delete('/v1/movies/:id', async (req, res) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const id = parseInt(req.params.id);

  const movie = await movieRepository.findOneBy({
    id,
  });

  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
  }

  await movieRepository
    .delete(id)
    .then(() => res.status(200).json({ message: 'Movie deleted successfully' }))
    .catch((error) =>
      res.status(500).json({ error, message: 'Something went wrong' })
    );
});

/**
 * @swagger
 * /v1/mock:
 *   post:
 *     summary: Create mock list of movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_date:
 *                 type: string
 *                 format: date
 *               overview:
 *                 type: string
 *               runtime:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
moviesRouter.post('/v1/mock', async (_, res) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  await movieRepository
    .save([
      {
        title: 'The Dark Knight',
        release_date: '2008-07-18',
        overview:
          'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.',
        runtime: 152,
      },
      {
        title: 'Inception',
        release_date: '2010-07-16',
        overview:
          'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
        runtime: 148,
      },
      {
        title: 'The Matrix',
        release_date: '1999-03-31',
        overview:
          'A hacker discovers the truth about his reality and his role in the war against its controllers.',
        runtime: 136,
      },
      {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        release_date: '2001-12-19',
        overview:
          'A young hobbit and his companions set out on a quest to destroy a powerful ring.',
        runtime: 178,
      },
      {
        title: 'The Shawshank Redemption',
        release_date: '1994-09-22',
        overview:
          'Two imprisoned men bond over years, finding solace and eventual redemption.',
        runtime: 142,
      },
      {
        title: 'Avengers: Endgame',
        release_date: '2019-04-26',
        overview:
          'The Avengers assemble to undo the damage caused by Thanos and restore balance to the universe.',
        runtime: 181,
      },
      {
        title: 'Forrest Gump',
        release_date: '1994-07-06',
        overview:
          'The story of Forrest Gump, a man with a low IQ but a big heart, who unwittingly influences key historical events.',
        runtime: 142,
      },
      {
        title: 'The Lion King',
        release_date: '1994-06-15',
        overview:
          'A lion cub flees his kingdom only to learn the true meaning of responsibility and bravery.',
        runtime: 88,
      },
      {
        title: 'Interstellar',
        release_date: '2014-11-07',
        overview:
          "A group of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
        runtime: 169,
      },
      {
        id: 10,
        title: 'Pulp Fiction',
        release_date: '1994-10-14',
        overview:
          'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of crime and redemption.',
        runtime: 154,
      },
    ])
    .then((m) => res.json(m));
});
