import express from 'express';
import MovieActorController from '../controllers/movieActorController';
const router = express.Router();

router.post('/', MovieActorController.addMovieActor);
router.delete('/',MovieActorController.deleteMovieActor);

export default router;
