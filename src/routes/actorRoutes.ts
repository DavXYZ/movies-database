import express from 'express';
import ActorController from '../controllers/actorController';

const router = express.Router();

router.get('/', ActorController.getAllActors);
router.get('/:id', ActorController.getActorById);
router.post('/', ActorController.addActor);
router.put('/:id', ActorController.updateActorInfo);
router.delete('/:id', ActorController.deleteActor);

export default router;
