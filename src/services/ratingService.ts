import RatingModel from '../models/ratingModel';

export default class RatingService {
  static async getAllRatings() {
    try {
      return await RatingModel.getAllRatings();
    } catch (error) {
      console.error('Error fetching all ratings:', error);
      throw new Error('Failed to fetch ratings');
    }
  }

  static async getRatingByMovieId(movieId: number) {
    try {
      const rating = await RatingModel.getRatingByMovieId(movieId);
      if (!rating) throw new Error('Rating for movie not found');
      return rating;
    } catch (error) {
      console.error(`Error fetching rating for movie ID ${movieId}:`, error);
      throw new Error('Failed to fetch rating');
    }
  }

  static async addRating(movieId: number, rating: number) {
    try {
      return await RatingModel.addRating(movieId, rating);
    } catch (error) {
      console.error('Error adding rating:', error);
      throw new Error('Failed to add rating');
    }
  }

  static async updateRating(movieId: number, rating: number) {
    try {
      const existingRating = await RatingModel.getRatingByMovieId(movieId);
      if (!existingRating) throw new Error('Rating for movie not found');
      return await RatingModel.updateRating(movieId, rating);
    } catch (error) {
      console.error(`Error updating rating for movie ID ${movieId}:`, error);
      throw new Error('Failed to update rating');
    }
  }

  static async deleteRating(movieId: number) {
    try {
      const rating = await RatingModel.getRatingByMovieId(movieId);
      if (!rating) throw new Error('Rating for movie not found');
      return await RatingModel.deleteRating(movieId);
    } catch (error) {
      console.error(`Error deleting rating for movie ID ${movieId}:`, error);
      throw new Error('Failed to delete rating');
    }
  }
}
