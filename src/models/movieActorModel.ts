// movieActorModel.ts
import { AppDataSource } from '../data-source';
import { MovieActor } from '../entities/movieActor';  // Import the MovieActor entity
import { Movie } from '../entities/movie';
import { Actor } from '../entities/actor';
import { Repository } from 'typeorm';

export default class MovieActorModel {
  private static movieActorRepository: Repository<MovieActor> = AppDataSource.getRepository(MovieActor);
  private static movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  private static actorRepository: Repository<Actor> = AppDataSource.getRepository(Actor);

  static async addMovieActor(movieId: number, actorId: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { movieId } });
      const actor = await this.actorRepository.findOne({ where: { actorId } });

      if (!movie) throw new Error(`Movie with ID ${movieId} not found`);
      if (!actor) throw new Error(`Actor with ID ${actorId} not found`);

      const movieActor = this.movieActorRepository.create({ movie, actor });
      await this.movieActorRepository.save(movieActor);
      return movieActor;
    } catch (error) {
      console.error(`Error adding association between movie ID ${movieId} and actor ID ${actorId}:`, error);
      throw new Error('Unable to add movie-actor association');
    }
  }

  static async deleteMovieActor(movieId: number, actorId: number) {
    try {
      const movieActor = await this.movieActorRepository.findOne({
        where: { movie: { movieId }, actor: { actorId } },
      });

      if (!movieActor) {
        throw new Error(`Association between movie ID ${movieId} and actor ID ${actorId} not found`);
      }

      await this.movieActorRepository.delete(movieActor);
    } catch (error) {
      console.error(`Error deleting association between movie ID ${movieId} and actor ID ${actorId}:`, error);
      throw new Error('Unable to delete movie-actor association');
    }
  }
}
