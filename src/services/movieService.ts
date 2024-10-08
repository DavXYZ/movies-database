import MovieModel from '../models/movieModel';

export default class MovieService {
  static async getAllMovies() {
    try {
      return await MovieModel.getAllMovies();
    } catch (error) {
      console.error('Error fetching all movies:', error);
      throw new Error('Failed to fetch movies');
    }
  }

  static async getMovieById(id: number) {
    try {
      const movie = await MovieModel.getMovieById(id);
      if (!movie) throw new Error('Movie not found');
      return movie;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      throw new Error('Failed to fetch movie');
    }
  }

  static async addMovie(title: string, releaseYear: number, directorId: number) {
    try {
      return await MovieModel.addMovie(title, releaseYear, directorId);
    } catch (error) {
      console.error('Error adding movie:', error);
      throw new Error('Failed to add movie');
    }
  }

  static async updateMovieInfo(id: number, title: string, releaseYear: number, directorId: number) {
    try {
      const movie = await MovieModel.getMovieById(id);
      if (!movie) throw new Error('Movie not found');
      return await MovieModel.updateMovieInfo(id, title, releaseYear, directorId);
    } catch (error) {
      console.error(`Error updating movie with ID ${id}:`, error);
      throw new Error('Failed to update movie');
    }
  }

  static async deleteMovie(id: number) {
    try {
      const movie = await MovieModel.getMovieById(id);
      if (!movie) throw new Error('Movie not found');
      return await MovieModel.deleteMovie(id);
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error);
      throw new Error('Failed to delete movie');
    }
  }
}
