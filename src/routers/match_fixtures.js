import express from 'express';
import { getMatchFixturesController } from '../controllers/index.js';
import { validateBody } from '../middleware/validation.js';
import { matchFixtureSchema } from '../validation/index.js';


export const MatchRouter = express.Router();

MatchRouter
    .post('/', validateBody(matchFixtureSchema), getMatchFixturesController.create)
    .get('/', getMatchFixturesController.getAll)
    .get('/:id', getMatchFixturesController.getById)
    .put('/:id', validateBody(matchFixtureSchema), getMatchFixturesController.uptade)
    .delete('/:id', getMatchFixturesController.delete);
