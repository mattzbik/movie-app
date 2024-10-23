import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column()
  overview: string;

  @Column()
  runtime: number;
}
