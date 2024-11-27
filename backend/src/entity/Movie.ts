import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'The Movie Model' })
@Entity()
export class Movie extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Title of Movie' })
  @Column()
  title: string;

  @Field(() => String, { description: 'Date Movie was released' })
  @Column({ type: 'date' })
  release_date: string;

  @Field(() => String, { description: 'Overview of movie.', nullable: true })
  @Column()
  overview?: string;

  @Field(() => Number, { description: 'Movie length in minutes.' })
  @Column()
  runtime: number;
}
