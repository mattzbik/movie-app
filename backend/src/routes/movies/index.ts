import express from 'express';
import { AppDataSource } from '../../data-source';
import { Movie } from '../../entity/Movie';

export const moviesRouter = express.Router();

/**
 * @swagger
 * /movies:
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
moviesRouter.get('/movies', async (_, res) => {
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
 * /movies:
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
moviesRouter.post('/movies', async (req, res, next) => {
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
 * /movies/{id}:
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
moviesRouter.get('/movies/:id', async (req, res, next) => {
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
 * /movies/{id}:
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
moviesRouter.put('/movies/:id', async (req, res, next) => {
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
 * /movies/{id}:
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
moviesRouter.delete('/movies/:id', async (req, res) => {
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
