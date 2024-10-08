import MovieGenresModel from '../models/movieGenresModel';

export default class MovieGenresService {
  static async addMovieGenre(movieId: number, genreId: number) {
    try {
      return await MovieGenresModel.addMovieGenre(movieId, genreId);
    } catch (error) {
      console.error(`Error adding genre with ID ${genreId} to movie with ID ${movieId}:`, error);
      throw new Error('Failed to add movie-genre association');
    }
  }

  static async deleteMovieGenre(movieId: number, genreId: number) {
    try {
      return await MovieGenresModel.deleteMovieGenre(movieId, genreId);
    } catch (error) {
      console.error(`Error deleting genre with ID ${genreId} from movie with ID ${movieId}:`, error);
      throw new Error('Failed to delete movie-genre association');
    }
  }
}
