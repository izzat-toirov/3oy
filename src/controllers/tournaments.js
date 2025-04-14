import { Tournament } from "../model/index.js";

export const createTournament = {
    create: async (req, res) => {
        try {
            const { tournament_name, status } = req.body;
            if (!tournament_name || !status) {
                return res.status(400).json({ message: "Tournament name and status are required" });
            }

            const newTournament = new Tournament({ tournament_name, status });
            await newTournament.save();

            res.status(201).json(newTournament);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    uptade: async (req, res) => {
        try {
            const { tournament_name, status } = req.body;
            if (!tournament_name || !status) {
                return res.status(400).json({ message: "Tournament name and status are required" });
            }

            const update = await Tournament.findByIdAndUpdate(
                req.params.id,
                { tournament_name, status },
                { new: true }
            );

            if (!update) {
                return res.status(404).json({ message: "Tournament not found" });
            }

            res.status(200).json(update);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const tournaments = await Tournament.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
            res.status(200).json(tournaments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const tournament = await Tournament.findById(req.params.id);
            if (!tournament) {
                return res.status(404).json({ message: "Tournament not found" });
            }
            res.status(200).json(tournament);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const tournament = await Tournament.findByIdAndDelete(req.params.id);
            if (!tournament) {
                return res.status(404).json({ message: "Tournament not found" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
