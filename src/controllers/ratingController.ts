import { Request, Response } from 'express';
import RatingService from '../services/ratingService';

export default class RatingController {
  static async getAllRatings(req: Request, res: Response) {
    try {
      const ratings = await RatingService.getAllRatings();
      res.status(200).json(ratings);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      res.status(500).json({ error: 'Failed to fetch ratings' });
    }
  }

  static async getRatingByMovieId(req: Request, res: Response) {
    const movieId = parseInt(req.params.movieId);
    if (isNaN(movieId)) {
      return res.status(400).json({ error: 'Invalid movieId' });
    }

    try {
      const rating = await RatingService.getRatingByMovieId(movieId);
      if (rating) {
        res.status(200).json(rating);
      } else {
        res.status(404).json({ error: 'Rating not found' });
      }
    } catch (error) {
      console.error('Error fetching rating by movieId:', error);
      res.status(500).json({ error: 'Failed to fetch rating' });
    }
  }

  static async addRating(req: Request, res: Response) {
    const { movieId, rating } = req.body;

    // Input validation
    if (!movieId || rating === undefined) {
      return res.status(400).json({ error: 'movieId and rating are required' });
    }

    try {
      const newRating = await RatingService.addRating(movieId, rating);
      res.status(201).json(newRating);
    } catch (error) {
      console.error('Error adding rating:', error);
      res.status(500).json({ error: 'Failed to add rating' });
    }
  }

  static async updateRating(req: Request, res: Response) {
    const movieId = parseInt(req.params.movieId);
    if (isNaN(movieId)) {
      return res.status(400).json({ error: 'Invalid movieId' });
    }

    const { rating } = req.body;
    if (rating === undefined) {
      return res.status(400).json({ error: 'Rating is required' });
    }

    try {
      const updatedRating = await RatingService.updateRating(movieId, rating);
      if (updatedRating) {
        res.status(200).json(updatedRating);
      } else {
        res.status(404).json({ error: 'Rating not found' });
      }
    } catch (error) {
      console.error('Error updating rating:', error);
      res.status(500).json({ error: 'Failed to update rating' });
    }
  }

  static async deleteRating(req: Request, res: Response) {
    const movieId = parseInt(req.params.movieId);
    if (isNaN(movieId)) {
      return res.status(400).json({ error: 'Invalid movieId' });
    }

    try {
      await RatingService.deleteRating(movieId);
      res.status(204).send(); // No content to return after deletion
    } catch (error) {
      console.error('Error deleting rating:', error);
      res.status(500).json({ error: 'Failed to delete rating' });
    }
  }
}
