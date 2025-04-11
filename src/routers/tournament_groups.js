import express from "express";
import { TournamentGroup } from "../model/tournament_groups.js";

const router = express.Router();
// Get all tournament groups
router.get("/", async (req, res) => {
    try {
        const tournamentGroups = await TournamentGroup.find().populate("tournament_id");
        res.status(200).json(tournamentGroups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a tournament group by ID
router.get("/:id", async (req, res) => {
    try {
        const tournamentGroup = await TournamentGroup.findById(req.params.id).populate("tournament_id");
        if (!tournamentGroup) {
            return res.status(404).json({ message: "Tournament group not found" });
        }
        res.status(200).json(tournamentGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new tournament group
router.post("/", async (req, res) => {
    const tournamentGroup = new TournamentGroup({
        group_name: req.body.group_name,
        tournament_id: req.body.tournament_id
    });

    try {
        const newTournamentGroup = await tournamentGroup.save();
        res.status(201).json(newTournamentGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a tournament group
router.put("/:id", async (req, res) => {
    try {
        const update = await TournamentGroup.findByIdAndUpdate(
            req.params.id,
            {
                group_name: req.body.group_name,
                tournament_id: req.body.tournament_id
            },
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: "Tournament group not found" });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a tournament group
router.delete("/:id", async (req, res) => {
    try {
        const tournamentGroup = await TournamentGroup.findByIdAndDelete(req.params.id);
        if (!tournamentGroup) {
            return res.status(404).json({ message: "Tournament group not found" });
        }
        res.status(200).json(tournamentGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;