import express from "express";
import { getAllTeams } from "../controllers/index.js";
import { validateBody } from '../middleware/validation.js';
import { teamSchema } from "../validation/index.js";

export const TeamRouter = express.Router();

TeamRouter
    .post('/', validateBody(teamSchema), getAllTeams.create)
    .get('/', getAllTeams.getAll)
    .get('/:id', getAllTeams.getById)
    .put('/:id', validateBody(teamSchema), getAllTeams.uptade)
    .delete('/:id', getAllTeams.delete);


