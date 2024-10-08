import DirectorModel from '../models/directorModel';

export default class DirectorService {
  static async getAllDirectors() {
    try {
      return await DirectorModel.getAllDirectors();
    } catch (error) {
      console.error('Error fetching all directors:', error);
      throw new Error('Failed to fetch directors');
    }
  }

  static async getDirectorById(id: number) {
    try {
      const director = await DirectorModel.getDirectorById(id);
      if (!director) throw new Error('Director not found');
      return director;
    } catch (error) {
      console.error(`Error fetching director with id ${id}:`, error);
      throw new Error('Failed to fetch director');
    }
  }

  static async addDirector(name: string, nationality: string, dob: string) {
    try {
      return await DirectorModel.addDirector(name, nationality, dob);
    } catch (error) {
      console.error('Error adding director:', error);
      throw new Error('Failed to add director');
    }
  }

  static async updateDirectorInfo(id: number, name: string, nationality: string, dob: string) {
    try {
      const director = await DirectorModel.getDirectorById(id);
      if (!director) throw new Error('Director not found');
      return await DirectorModel.updateDirectorInfo(id, name, nationality, dob);
    } catch (error) {
      console.error(`Error updating director with id ${id}:`, error);
      throw new Error('Failed to update director');
    }
  }

  static async deleteDirector(id: number) {
    try {
      const director = await DirectorModel.getDirectorById(id);
      if (!director) throw new Error('Director not found');
      await DirectorModel.deleteDirector(id);
    } catch (error) {
      console.error(`Error deleting director with id ${id}:`, error);
      throw new Error('Failed to delete director');
    }
  }
}
