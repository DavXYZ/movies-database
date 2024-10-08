// movieModel.ts
import { AppDataSource } from '../data-source';
import { Movie } from '../entities/movie';
import { Director } from '../entities/director'; // Import Director
import { Repository } from 'typeorm';

export default class MovieModel {
  private static movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  private static directorRepository: Repository<Director> = AppDataSource.getRepository(Director);

  static async getAllMovies() {
    try {
      return await this.movieRepository.find({ relations: ['director'] });
    } catch (error) {
      console.error('Error fetching all movies:', error);
      throw new Error('Unable to retrieve movies');
    }
  }

  static async getMovieById(id: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { movieId: id }, relations: ['director'] });
      if (!movie) throw new Error(`Movie with ID ${id} not found`);
      return movie;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      throw new Error('Unable to retrieve movie');
    }
  }

  static async addMovie(title: string, releaseYear: number, directorId: number) {
    try {
      const director = await this.directorRepository.findOneBy({ directorId });
      if (!director) throw new Error(`Director with ID ${directorId} not found`);

      const movie = this.movieRepository.create({
        title,
        releaseYear,
        director,  // Use the Director entity directly
      });

      return await this.movieRepository.save(movie);
    } catch (error) {
      console.error(`Error adding movie with title "${title}":`, error);
      throw new Error('Unable to add movie');
    }
  }

  static async updateMovieInfo(id: number, title: string, releaseYear: number, directorId: number) {
    try {
      const movie = await this.getMovieById(id);
      if (!movie) throw new Error(`Movie with ID ${id} not found`);

      const director = await this.directorRepository.findOneBy({ directorId });
      if (!director) throw new Error(`Director with ID ${directorId} not found`);

      movie.title = title;
      movie.releaseYear = releaseYear;
      movie.director = director; // Set the full Director entity

      return await this.movieRepository.save(movie);
    } catch (error) {
      console.error(`Error updating movie with ID ${id}:`, error);
      throw new Error('Unable to update movie');
    }
  }

  static async deleteMovie(id: number) {
    try {
      const movie = await this.getMovieById(id);
      if (!movie) throw new Error(`Movie with ID ${id} not found`);

      await this.movieRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error);
      throw new Error('Unable to delete movie');
    }
  }
}
