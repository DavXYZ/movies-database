import GenreModel from '../models/genreModel';

export default class GenreService {
  static async getAllGenres() {
    try {
      return await GenreModel.getAllGenres();
    } catch (error) {
      console.error('Error fetching all genres:', error);
      throw new Error('Failed to fetch genres');
    }
  }

  static async getGenreById(id: number) {
    try {
      const genre = await GenreModel.getGenreById(id);
      if (!genre) throw new Error('Genre not found');
      return genre;
    } catch (error) {
      console.error(`Error fetching genre with id ${id}:`, error);
      throw new Error('Failed to fetch genre');
    }
  }

  static async addGenre(genreName: string) {
    try {
      return await GenreModel.addGenre(genreName);
    } catch (error) {
      console.error('Error adding genre:', error);
      throw new Error('Failed to add genre');
    }
  }

  static async updateGenreInfo(id: number, genreName: string) {
    try {
      const genre = await GenreModel.getGenreById(id);
      if (!genre) throw new Error('Genre not found');
      return await GenreModel.updateGenreInfo(id, genreName);
    } catch (error) {
      console.error(`Error updating genre with id ${id}:`, error);
      throw new Error('Failed to update genre');
    }
  }

  static async deleteGenre(id: number) {
    try {
      const genre = await GenreModel.getGenreById(id);
      if (!genre) throw new Error('Genre not found');
      return await GenreModel.deleteGenre(id);
    } catch (error) {
      console.error(`Error deleting genre with id ${id}:`, error);
      throw new Error('Failed to delete genre');
    }
  }
}
