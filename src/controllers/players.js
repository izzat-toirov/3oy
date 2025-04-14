import { Player } from '../model/players.js';

export const getPlayers = {
    create: async (req, res) => {
        try {
            const { full_name, date_of_birth, position, team_id, jersey_number } = req.body;
            if (!full_name || !date_of_birth || !position || !team_id || !jersey_number) {
                return res.status(400).json({ message: "Full name, date of birth, position, team ID, and jersey number are required" });
            }

            const newPlayer = new Player({ full_name, date_of_birth, position, team_id, jersey_number });
            await newPlayer.save();

            res.status(201).json(newPlayer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    uptade: async (req, res) => {
        try {
            const { full_name, date_of_birth, position, team_id, jersey_number } = req.body;
            if (!full_name || !date_of_birth || !position || !team_id || !jersey_number) {
                return res.status(400).json({ message: "Player name and team ID are required" });
            }

            const update = await Player.findByIdAndUpdate(
                req.params.id,
                { full_name, date_of_birth, position, team_id, jersey_number },
                { new: true }
            );

            if (!update) {
                return res.status(404).json({ message: "Player not found" });
            }

            res.status(200).json(update);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const players = await Player.find()
                .populate("team_id", "team_name")
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const player = await Player.findById(req.params.id);
            if (!player) {
                return res.status(404).json({ message: "Player not found" });
            }
            res.status(200).json(player);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const player = await Player.findByIdAndDelete(req.params.id);
            if (!player) {
                return res.status(404).json({ message: "Player not found" });
            }
            res.status(200).json({ message: "Player deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};