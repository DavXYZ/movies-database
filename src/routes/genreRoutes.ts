import express from 'express';
import GenreController from '../controllers/genreController';

const router = express.Router();

router.get('/', GenreController.getAllGenres);
router.get('/:id', GenreController.getGenreById);
router.post('/', GenreController.addGenre);
router.put('/:id', GenreController.updateGenreInfo);
router.delete('/:id', GenreController.deleteGenre);

export default router;
