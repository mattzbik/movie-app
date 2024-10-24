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
  const movies = await movieRepository.find();
  res.json(movies);
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
  try {
    const { title, release_date, overview, runtime } = req.body;

    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = movieRepository.create({
      title,
      release_date,
      overview,
      runtime,
    });
    await movieRepository.save(movie);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});
