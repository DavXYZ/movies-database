import { Request, Response } from 'express';
import MovieService from '../services/movieService';

export default class MovieController {
  static async getAllMovies(req: Request, res: Response) {
    try {
      const movies = await MovieService.getAllMovies();
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  }

  static async getMovieById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }

    try {
      const movie = await MovieService.getMovieById(id);
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      res.status(500).json({ error: 'Failed to fetch movie' });
    }
  }

  static async addMovie(req: Request, res: Response) {
    const { title, releaseYear, directorId } = req.body;

    if (!title || !releaseYear || !directorId) {
      return res.status(400).json({ error: 'All fields are required (title, releaseYear, directorId)' });
    }

    try {
      const newMovie = await MovieService.addMovie(title, releaseYear, directorId);
      res.status(201).json(newMovie);
    } catch (error) {
      console.error('Error adding movie:', error);
      res.status(500).json({ error: 'Failed to add movie' });
    }
  }

  static async updateMovieInfo(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }

    const { title, releaseYear, directorId } = req.body;

    if (!title && !releaseYear && !directorId) {
      return res.status(400).json({ error: 'At least one field (title, releaseYear, directorId) is required for update' });
    }

    try {
      const updatedMovie = await MovieService.updateMovieInfo(id, title, releaseYear, directorId);
      if (updatedMovie) {
        res.status(200).json(updatedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ error: 'Failed to update movie' });
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }

    try {
      await MovieService.deleteMovie(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Failed to delete movie' });
    }
  }
}
