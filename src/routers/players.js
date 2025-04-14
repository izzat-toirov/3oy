import express from 'express';
import { getPlayers } from '../controllers/index.js';
import { validateBody } from '../middleware/validation.js';
import { playerSchema } from '../validation/index.js';

export const PlayerRouter = express.Router();

PlayerRouter
    .post('/', validateBody(playerSchema), getPlayers.create)
    .get('/', getPlayers.getAll)
    .get('/:id', getPlayers.getById)
    .put('/:id', validateBody(playerSchema), getPlayers.uptade)
    .delete('/:id', getPlayers.delete);
