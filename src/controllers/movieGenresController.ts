import { Request, Response } from 'express';
import MovieGenresService from '../services/movieGenresService';

export default class MovieGenresController {
  static async addMovieGenre(req: Request, res: Response) {
    const { movieId, genreId } = req.body;

    if (!movieId || !genreId) {
      return res.status(400).json({ error: 'Both movieId and genreId are required' });
    }

    try {
      const newMovieGenre = await MovieGenresService.addMovieGenre(movieId, genreId);
      res.status(201).json(newMovieGenre);
    } catch (error) {
      console.error('Error adding movie genre association:', error);
      res.status(500).json({ error: 'Failed to add movie genre association' });
    }
  }

  static async deleteMovieGenre(req: Request, res: Response) {
    const { movieId, genreId } = req.body;

    if (!movieId || !genreId) {
      return res.status(400).json({ error: 'Both movieId and genreId are required' });
    }

    try {
      await MovieGenresService.deleteMovieGenre(movieId, genreId);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting movie genre association:', error);
      res.status(500).json({ error: 'Failed to delete movie genre association' });
    }
  }
}
