import { Request, Response } from "express";
import DirectorService from "../services/directorService";

export default class DirectorController {
  static async getAllDirectors(req: Request, res: Response) {
    try {
      const directors = await DirectorService.getAllDirectors();
      if (directors && directors.length > 0) {
        res.status(200).json(directors);
      } else {
        res.status(404).json({ error: "No directors found." });
      }
    } catch (error) {
      console.error('Error fetching directors:', error);
      res.status(500).json({ error: 'Failed to fetch directors' });
    }
  }

  static async getDirectorById(req: Request, res: Response) {
    const { id } = req.params;
    const directorId = parseInt(id);

    if (isNaN(directorId)) {
      return res.status(400).json({ error: 'Invalid director ID' });
    }

    try {
      const director = await DirectorService.getDirectorById(directorId);
      if (director) {
        res.status(200).json(director);
      } else {
        res.status(404).json({ error: "Director not found." });
      }
    } catch (error) {
      console.error(`Error fetching director by ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to fetch director' });
    }
  }

  static async addDirector(req: Request, res: Response) {
    const { name, nationality, dob } = req.body;

    if (!name || !nationality || !dob) {
      return res.status(400).json({ error: "Missing required fields: name, nationality, or dob." });
    }

    try {
      const newDirector = await DirectorService.addDirector(name, nationality, dob);
      res.status(201).json(newDirector);
    } catch (error) {
      console.error('Error adding director:', error);
      res.status(500).json({ error: 'Failed to add new director.' });
    }
  }

  static async updateDirectorInfo(req: Request, res: Response) {
    const { id } = req.params;
    const { name, nationality, dob } = req.body;
    const directorId = parseInt(id);

    if (isNaN(directorId)) {
      return res.status(400).json({ error: 'Invalid director ID' });
    }

    if (!name || !nationality || !dob) {
      return res.status(400).json({ error: 'Missing required fields: name, nationality, or dob.' });
    }

    try {
      const updatedDirector = await DirectorService.updateDirectorInfo(directorId, name, nationality, dob);
      if (updatedDirector) {
        res.status(200).json(updatedDirector);
      } else {
        res.status(404).json({ error: 'Director not found.' });
      }
    } catch (error) {
      console.error(`Error updating director with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to update director info.' });
    }
  }

  static async deleteDirector(req: Request, res: Response) {
    const { id } = req.params;
    const directorId = parseInt(id);

    if (isNaN(directorId)) {
      return res.status(400).json({ error: 'Invalid director ID' });
    }

    try {
      const director = await DirectorService.getDirectorById(directorId);
      if (!director) {
        return res.status(404).json({ error: 'Director not found.' });
      }

      await DirectorService.deleteDirector(directorId);
      res.status(204).send(`The Director with ID ${id} was deleted.`);
    } catch (error) {
      console.error(`Error deleting director with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to delete director.' });
    }
  }
}
