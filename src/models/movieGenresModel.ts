// movieGenresModel.ts
import { AppDataSource } from '../data-source';
import { MovieGenres } from '../entities/movieGenres';  // Import the MovieGenres entity
import { Movie } from '../entities/movie';
import { Genre } from '../entities/genre';
import { Repository } from 'typeorm';

export default class MovieGenresModel {
  private static movieGenreRepository: Repository<MovieGenres> = AppDataSource.getRepository(MovieGenres);
  private static movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  private static genreRepository: Repository<Genre> = AppDataSource.getRepository(Genre);

  static async addMovieGenre(movieId: number, genreId: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { movieId } });
      const genre = await this.genreRepository.findOne({ where: { genreId } });

      if (!movie) throw new Error(`Movie with ID ${movieId} not found`);
      if (!genre) throw new Error(`Genre with ID ${genreId} not found`);

      const movieGenre = this.movieGenreRepository.create({ movie, genre });
      await this.movieGenreRepository.save(movieGenre);
      return movieGenre;
    } catch (error) {
      console.error(`Error adding association between movie ID ${movieId} and genre ID ${genreId}:`, error);
      throw new Error('Unable to add movie-genre association');
    }
  }

  static async deleteMovieGenre(movieId: number, genreId: number) {
    try {
      const movieGenre = await this.movieGenreRepository.findOne({
        where: { movie: { movieId }, genre: { genreId } },
      });

      if (!movieGenre) {
        throw new Error(`Association between movie ID ${movieId} and genre ID ${genreId} not found`);
      }

      await this.movieGenreRepository.delete(movieGenre);
    } catch (error) {
      console.error(`Error deleting association between movie ID ${movieId} and genre ID ${genreId}:`, error);
      throw new Error('Unable to delete movie-genre association');
    }
  }
}
