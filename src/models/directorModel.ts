// directorModel.ts
import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Director } from '../entities/director'; 
import { Movie } from '../entities/movie'; 

export default class DirectorModel {
  private static directorRepository: Repository<Director> = AppDataSource.getRepository(Director);
  private static movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  static async getAllDirectors() {
    try {
      return await this.directorRepository.find();
    } catch (error) {
      console.error('Error fetching all directors:', error);
      throw new Error('Unable to fetch directors');
    }
  }

  static async getDirectorById(id: number) {
    try {
      const director = await this.directorRepository.findOne({ where: { directorId: id } });
      if (!director) {
        throw new Error(`Director with ID ${id} not found`);
      }
      return director;
    } catch (error) {
      console.error(`Error fetching director with ID ${id}:`, error);
      throw new Error(`Unable to fetch director with ID ${id}`);
    }
  }

  static async addDirector(name: string, nationality: string, dob: string) {
    try {
      const director = this.directorRepository.create({ name, nationality, dob });
      return await this.directorRepository.save(director);
    } catch (error) {
      console.error('Error adding director:', error);
      throw new Error('Unable to add director');
    }
  }

  static async updateDirectorInfo(id: number, name: string, nationality: string, dob: string) {
    try {
      const director = await this.getDirectorById(id);
      if (!director) throw new Error(`Director with ID ${id} not found`);

      await this.directorRepository.update(id, { name, nationality, dob });
      return await this.getDirectorById(id);
    } catch (error) {
      console.error(`Error updating director with ID ${id}:`, error);
      throw new Error(`Unable to update director with ID ${id}`);
    }
  }

  static async deleteDirector(id: number) {
    try {
      const director = await this.getDirectorById(id);
      if (!director) {
        throw new Error(`Director with ID ${id} not found`);
      }

      const movies = await this.movieRepository.find({ where: { director: { directorId: id } } });
      if (movies.length > 0) {
        for (const movie of movies) {
          await this.movieRepository.update(movie.movieId, { director: undefined });
        }
      }

      const result = await this.directorRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`Failed to delete director with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting director with ID ${id}:`, error);
      throw new Error(`Unable to delete director with ID ${id}`);
    }
  }
}
