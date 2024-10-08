// ratingModel.ts
import { AppDataSource } from '../data-source';
import { Rating } from '../entities/rating'; // Import the Rating entity
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie'; // Import the Movie entity

export default class RatingModel {
  private static ratingRepository: Repository<Rating> = AppDataSource.getRepository(Rating);
  private static movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  static async getAllRatings() {
    try {
      return await this.ratingRepository.find({ relations: ['movie'] });
    } catch (error) {
      console.error('Error fetching all ratings:', error);
      throw new Error('Unable to retrieve ratings');
    }
  }

  static async getRatingByMovieId(movieId: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { movieId } });
      if (!movie) throw new Error(`Movie with ID ${movieId} not found`);

      const rating = await this.ratingRepository.findOne({ where: { movie } });
      if (!rating) throw new Error(`Rating for movie with ID ${movieId} not found`);

      return rating;
    } catch (error) {
      console.error(`Error fetching rating for movie ID ${movieId}:`, error);
      throw new Error('Unable to retrieve rating');
    }
  }

  static async addRating(movieId: number, ratingValue: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { movieId } });
      if (!movie) throw new Error(`Movie with ID ${movieId} not found`);

      const rating = this.ratingRepository.create({ movie, rating: ratingValue });
      return await this.ratingRepository.save(rating);
    } catch (error) {
      console.error(`Error adding rating for movie ID ${movieId}:`, error);
      throw new Error('Unable to add rating');
    }
  }

  static async updateRating(movieId: number, ratingValue: number) {
    try {
      const ratingInfo = await this.getRatingByMovieId(movieId);
      if (!ratingInfo) throw new Error(`Rating for movie ID ${movieId} not found`);

      ratingInfo.rating = ratingValue;
      return await this.ratingRepository.save(ratingInfo);
    } catch (error) {
      console.error(`Error updating rating for movie ID ${movieId}:`, error);
      throw new Error('Unable to update rating');
    }
  }

  static async deleteRating(movieId: number) {
    try {
      const rating = await this.getRatingByMovieId(movieId);
      if (!rating) throw new Error(`Rating for movie ID ${movieId} not found`);

      await this.ratingRepository.delete(rating.ratingId); // Use the rating ID to delete
    } catch (error) {
      console.error(`Error deleting rating for movie ID ${movieId}:`, error);
      throw new Error('Unable to delete rating');
    }
  }
}
