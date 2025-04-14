import express from 'express';
import { createTournament } from '../controllers/index.js';
import { tournamentSchema } from '../validation/index.js';
import { validateBody } from '../middleware/validation.js';


export const TournamentRouter = express.Router();

TournamentRouter
    .post('/', validateBody(tournamentSchema), createTournament.create)
    .get('/', createTournament.getAll)
    .get('/:id', createTournament.getById)
    .put('/:id', validateBody(tournamentSchema), createTournament.uptade)
    .delete('/:id', createTournament.delete);