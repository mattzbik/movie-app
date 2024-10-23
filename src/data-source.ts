import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Movie } from './entity/Movie';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Automatically synchronize database schema
  entities: [Movie], // Register the Movie entity
});
