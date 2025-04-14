import express from "express";
import { getAllFootballClubs } from "../controllers/index.js";
import { validateBody } from '../middleware/validation.js';
import { footballClubSchema } from "../validation/index.js";

export const ftRouter = express.Router();

ftRouter
    .post("/", validateBody(footballClubSchema), getAllFootballClubs.create)
    .get("/", getAllFootballClubs.getAll)
    .get("/:id", getAllFootballClubs.getById)
    .put("/:id", validateBody(footballClubSchema), getAllFootballClubs.uptade)
    .delete("/:id", getAllFootballClubs.delete);
