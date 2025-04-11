import express from "express";
import { FootballClub } from "../model/football_clubs.js";

const router = express.Router();
// Get all football clubs
router.get("/", async (req, res) => {
    try {
        const football_clubs = await FootballClub.find();
        res.status(200).json(football_clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a football club by ID
router.get("/:id", async (req, res) => {
    try {
        const football_club = await FootballClub.findById(req.params.id);
        if (!football_club) {
            return res.status(404).json({ message: "Football club not found" });
        }
        res.status(200).json(football_club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new football club
router.post("/", async (req, res) => {
    const football_club = new FootballClub({
        club_name: req.body.club_name,
        country: req.body.country
    });

    try {
        const newFootballClub = await FootballClub.save();
        res.status(201).json(newFootballClub);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a football club
router.put("/:id", async (req, res) => {
    try {
        const update = await FootballClub.findByIdAndUpdate(
            req.params.id,
            {
                club_name: req.body.club_name,
                country: req.body.country
            },
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: "Football club not found" });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a football club
router.delete("/:id", async (req, res) => {
    try {
        const football_club = await FootballClub.findByIdAndDelete(req.params.id);
        if (!football_club) {
            return res.status(404).json({ message: "Football club not found" });
        }
        res.status(200).json(football_club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;