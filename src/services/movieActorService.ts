import MovieActorModel from "../models/movieActorModel";

export default class MovieActorService {
  static async addMovieActor(movieId: number, actorId: number) {
    try {
      return await MovieActorModel.addMovieActor(movieId, actorId);
    } catch (error) {
      console.error(`Error adding actor with ID ${actorId} to movie with ID ${movieId}:`, error);
      throw new Error('Failed to add movie-actor association');
    }
  }

  static async deleteMovieActor(movieId: number, actorId: number) {
    try {
      return await MovieActorModel.deleteMovieActor(movieId, actorId);
    } catch (error) {
      console.error(`Error deleting actor with ID ${actorId} from movie with ID ${movieId}:`, error);
      throw new Error('Failed to delete movie-actor association');
    }
  }
}
