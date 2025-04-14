import express from "express";
import { getAllTournamentGroups } from "../controllers/index.js";
import { validateBody } from '../middleware/validation.js';
import { tournamentGroupSchema } from "../validation/index.js";

export const TgRouter = express.Router();


TgRouter
    .post('/', validateBody(tournamentGroupSchema), getAllTournamentGroups.create)
    .get('/', getAllTournamentGroups.getAll)
    .get('/:id', getAllTournamentGroups.getById)
    .put('/:id', validateBody(tournamentGroupSchema), getAllTournamentGroups.uptade)
    .delete('/:id', getAllTournamentGroups.delete);