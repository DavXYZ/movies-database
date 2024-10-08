import express from 'express';
import MovieGenresController from '../controllers/movieGenresController';

const router = express.Router();

router.post('/', MovieGenresController.addMovieGenre);
router.delete('/', MovieGenresController.deleteMovieGenre);

export default router;
