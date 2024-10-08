import { Request, Response } from 'express';
import GenreService from '../services/genreService';

export default class GenreController {
  static async getAllGenres(req: Request, res: Response) {
    try {
      const genres = await GenreService.getAllGenres();
      if (genres.length > 0) {
        res.status(200).json(genres);
      } else {
        res.status(404).json({ error: 'No genres found' });
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
      res.status(500).json({ error: 'Failed to fetch genres' });
    }
  }

  static async getGenreById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid genre ID' });
    }

    try {
      const genre = await GenreService.getGenreById(id);
      if (genre) {
        res.status(200).json(genre);
      } else {
        res.status(404).json({ error: 'Genre not found' });
      }
    } catch (error) {
      console.error(`Error fetching genre by ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to fetch genre' });
    }
  }

  static async addGenre(req: Request, res: Response) {
    const { genreName } = req.body;
    if (!genreName) {
      return res.status(400).json({ error: 'Genre name is required' });
    }

    try {
      const newGenre = await GenreService.addGenre(genreName);
      res.status(201).json(newGenre);
    } catch (error) {
      console.error('Error adding genre:', error);
      res.status(500).json({ error: 'Failed to add genre' });
    }
  }

  static async updateGenreInfo(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { genreName } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid genre ID' });
    }

    if (!genreName) {
      return res.status(400).json({ error: 'Genre name is required' });
    }

    try {
      const updatedGenre = await GenreService.updateGenreInfo(id, genreName);
      if (updatedGenre) {
        res.status(200).json(updatedGenre);
      } else {
        res.status(404).json({ error: 'Genre not found' });
      }
    } catch (error) {
      console.error(`Error updating genre with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to update genre' });
    }
  }

  static async deleteGenre(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid genre ID' });
    }

    try {
      const genre = await GenreService.getGenreById(id);
      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }

      await GenreService.deleteGenre(id);
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting genre with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to delete genre' });
    }
  }
}
