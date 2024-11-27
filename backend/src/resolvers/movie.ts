import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Movie } from '../entity/Movie';

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
