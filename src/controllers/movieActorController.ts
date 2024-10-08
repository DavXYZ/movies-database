import { Request, Response } from "express";
import MovieActorService from "../services/movieActorService";

export default class MovieActorController {
    static async addMovieActor(req: Request, res: Response) {
        const { movieId, actorId } = req.body;

        // Validate input
        if (!movieId || !actorId) {
            return res.status(400).json({ error: 'Both movieId and actorId are required' });
        }

        try {
            const movieActor = await MovieActorService.addMovieActor(movieId, actorId);
            res.status(201).json({ movieActor });
        } catch (error) {
            console.error('Error adding movie-actor association:', error);
            res.status(500).json({ error: 'Failed to add movie actor association' });
        }
    }

    static async deleteMovieActor(req: Request, res: Response) {
        const { movieId, actorId } = req.body;

        // Validate input
        if (!movieId || !actorId) {
            return res.status(400).json({ error: 'Both movieId and actorId are required' });
        }

        try {
            await MovieActorService.deleteMovieActor(movieId, actorId);
            res.status(204).send(); // No content to return after deletion
        } catch (error) {
            console.error('Error deleting movie-actor association:', error);
            res.status(500).json({ error: 'Failed to delete movie actor association' });
        }
    }
}
