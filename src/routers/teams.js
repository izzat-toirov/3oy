import express from "express";
import { Team } from "../model/teams.js";

const router = express.Router();
// Get all teams
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find().populate("group_id").populate("club_id");
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a team by ID
router.get("/:id", async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate("group_id").populate("club_id");
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new team
router.post("/", async (req, res) => {
    const team = new Team({
        team_name: req.body.team_name,
        group_id: req.body.group_id,
        club_id: req.body.club_id,
        coach_name: req.body.coach_name
    });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a team
router.put("/:id", async (req, res) => {
    try {
        const update = await Team.findByIdAndUpdate(
            req.params.id,
            {
                team_name: req.body.team_name,
                group_id: req.body.group_id,
                club_id: req.body.club_id,
                coach_name: req.body.coach_name
            },
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a team
router.delete("/:id", async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;