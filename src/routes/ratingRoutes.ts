import express from 'express';
import RatingController from '../controllers/ratingController';

const router = express.Router();

router.get('/', RatingController.getAllRatings);
router.get('/:movieId', RatingController.getRatingByMovieId);
router.post('/', RatingController.addRating);
router.put('/:movieId', RatingController.updateRating);
router.delete('/:movieId', RatingController.deleteRating);

export default router;
