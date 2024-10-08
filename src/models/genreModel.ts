// genreModel.ts
import { AppDataSource } from "../data-source";
import { Genre } from "../entities/genre";
import { Repository } from "typeorm";

export default class GenreModel {
  private static genreRepository: Repository<Genre> = AppDataSource.getRepository(Genre);

  static async getAllGenres() {
    try {
      return await this.genreRepository.find();
    } catch (error) {
      console.error('Error fetching all genres:', error);
      throw new Error('Unable to fetch genres');
    }
  }

  static async getGenreById(id: number) {
    try {
      const genre = await this.genreRepository.findOne({ where: { genreId: id } });
      if (!genre) {
        throw new Error(`Genre with ID ${id} not found`);
      }
      return genre;
    } catch (error) {
      console.error(`Error fetching genre with ID ${id}:`, error);
      throw new Error(`Unable to fetch genre with ID ${id}`);
    }
  }

  static async addGenre(genreName: string) {
    try {
      const genre = this.genreRepository.create({ genreName });
      return await this.genreRepository.save(genre);
    } catch (error) {
      console.error('Error adding genre:', error);
      throw new Error('Unable to add genre');
    }
  }

  static async updateGenreInfo(id: number, genreName: string) {
    try {
      const genre = await this.getGenreById(id);
      if (!genre) {
        throw new Error(`Genre with ID ${id} not found`);
      }

      await this.genreRepository.update(id, { genreName });
      return await this.getGenreById(id);
    } catch (error) {
      console.error(`Error updating genre with ID ${id}:`, error);
      throw new Error(`Unable to update genre with ID ${id}`);
    }
  }

  static async deleteGenre(id: number) {
    try {
      const genre = await this.getGenreById(id);
      if (!genre) {
        throw new Error(`Genre with ID ${id} not found`);
      }

      const result = await this.genreRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`Failed to delete genre with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting genre with ID ${id}:`, error);
      throw new Error(`Unable to delete genre with ID ${id}`);
    }
  }
}
