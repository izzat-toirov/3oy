import { FootballClub } from '../model/football_clubs.js';

export const getAllFootballClubs = {
    create: async (req, res) => {
        try {
            const { club_name, city, country } = req.body;
            if (!club_name || !country || !city) {
                return res.status(400).json({ message: "Club name and country are required" });
            }

            const newFootballClub = new FootballClub({ club_name, city, country });
            await newFootballClub.save();

            res.status(201).json(newFootballClub);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    uptade: async (req, res) => {
        try {
            const { club_name, city, country } = req.body;
            if (!club_name || !country || !city) {
                return res.status(400).json({ message: "Club name and country are required" });
            }

            const update = await FootballClub.findByIdAndUpdate(
                req.params.id,
                { club_name, city, country },
                { new: true }
            );

            if (!update) {
                return res.status(404).json({ message: "Football club not found" });
            }

            res.status(200).json(update);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const football_clubs = await FootballClub.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
            res.status(200).json(football_clubs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const football_club = await FootballClub.findById(req.params.id);
            if (!football_club) {
                return res.status(404).json({ message: "Football club not found" });
            }
            res.status(200).json(football_club);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const football_club = await FootballClub.findByIdAndDelete(req.params.id);
            if (!football_club) {
                return res.status(404).json({ message: "Football club not found" });
            }
            res.status(200).json({ message: "Football club deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};