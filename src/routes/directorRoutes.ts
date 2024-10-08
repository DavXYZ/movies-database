import express from 'express'
import DirectorController from '../controllers/directorController';

const router = express.Router();

router.get('/', DirectorController.getAllDirectors);
router.get('/:id',DirectorController.getDirectorById);
router.post('/',DirectorController.addDirector);
router.put('/:id',DirectorController.updateDirectorInfo);
router.delete('/:id',DirectorController.deleteDirector);

export default router;