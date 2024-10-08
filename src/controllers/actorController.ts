// actorController.ts
import { Request, Response } from 'express';
import ActorService from '../services/actorService';

export default class ActorController {
  static async getAllActors(req: Request, res: Response) {
    try {
      const actors = await ActorService.getAllActors();
      res.status(200).json(actors);
    } catch (error) {
      console.error('Error fetching all actors:', error);
      res.status(500).json({ error: 'Failed to fetch actors' });
    }
  }

  static async getActorById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid actor ID' });
    }

    try {
      const actor = await ActorService.getActorById(id);
      if (actor) {
        res.status(200).json(actor);
      } else {
        res.status(404).json({ error: 'Actor not found' });
      }
    } catch (error) {
      console.error(`Error fetching actor with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to fetch actor' });
    }
  }

  static async addActor(req: Request, res: Response) {
    const { name, nationality, dob } = req.body;
    if (!name || !nationality || !dob) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newActor = await ActorService.addActor(name, nationality, dob);
      res.status(201).json(newActor);
    } catch (error) {
      console.error('Error adding actor:', error);
      res.status(500).json({ error: 'Failed to add actor' });
    }
  }

  static async updateActorInfo(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { name, nationality, dob } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid actor ID' });
    }

    if (!name || !nationality || !dob) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const updatedActor = await ActorService.updateActorInfo(id, name, nationality, dob);
      if (updatedActor) {
        res.status(200).json(updatedActor);
      } else {
        res.status(404).json({ error: 'Actor not found' });
      }
    } catch (error) {
      console.error(`Error updating actor with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to update actor' });
    }
  }

  static async deleteActor(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid actor ID' });
    }

    try {
      await ActorService.deleteActor(id);
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting actor with ID ${id}:`, error);
      res.status(500).json({ error: 'Failed to delete actor' });
    }
  }
}
