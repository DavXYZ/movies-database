import express from 'express';
import MovieController from '../controllers/movieController';

const router = express.Router();

router.get('/', MovieController.getAllMovies);
router.get('/:id', MovieController.getMovieById);
router.post('/', MovieController.addMovie);
router.put('/:id', MovieController.updateMovieInfo);
router.delete('/:id', MovieController.deleteMovie);

export default router;
