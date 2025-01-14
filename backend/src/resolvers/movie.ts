import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { AppDataSource } from '../data-source';
import { Movie } from '../entity/Movie';

@ObjectType()
class PaginatedMovies {
  @Field()
  count: number;
  @Field(() => [Movie])
  movies: Movie[];
}

@InputType()
class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  overview: string;

  @Field()
  runtime: number;

  @Field()
  release_date: string;
}

@InputType()
class UpdateMovieInput implements Partial<Movie> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  overview?: string;

  @Field({ nullable: true })
  runtime?: number;

  @Field({ nullable: true })
  release_date?: string;
}

@Resolver(Movie)
export class MovieResolver {
  @Query(() => Movie, { nullable: true })
  async movie(@Arg('id') id: number): Promise<Movie | null> {
    return await Movie.findOne({ where: { id } });
  }

  /**
   * @todo Handle pagination correctly. Currently only adding limit and skip but I am not checking to see if there is more results based on the limit, skip, and movie count.
   */
  @Query(() => PaginatedMovies, { nullable: true })
  async movies(
    @Arg('limit') limit: number,
    @Arg('skip') skip?: number
  ): Promise<PaginatedMovies> {
    const realLimit = Math.min(50, limit);

    const movies = await AppDataSource.getRepository(Movie)
      .createQueryBuilder('movie')
      .skip(skip ?? 0)
      .take(limit)
      .getMany();

    const movieCount = await AppDataSource.getRepository(Movie)
      .createQueryBuilder('movie')
      .getCount();

    return {
      count: movieCount,
      movies: movies.slice(0, realLimit),
    };
  }

  @Mutation(() => Movie)
  async createMovie(@Arg('data') data: CreateMovieInput): Promise<Movie> {
    return await Movie.create({ ...data }).save();
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Arg('id') id: number,
    @Arg('options') options: UpdateMovieInput
  ): Promise<Movie | null> {
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) throw new Error('Movie not found!');
    Object.assign(movie, options);
    return await movie.save();
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg('id') id: number): Promise<boolean> {
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) throw new Error('Movie not found!');
    await movie.remove();
    return true;
  }
}
