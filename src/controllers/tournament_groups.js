import { TournamentGroup } from '../model/tournament_groups.js';

export const getAllTournamentGroups = {
    create: async (req, res) => {
        try {
            const { group_name, tournament_id } = req.body;
            if (!group_name || !tournament_id) {
                return res.status(400).json({ message: "Group name and tournament ID are required" });
            }

            const newTournamentGroup = new TournamentGroup({ group_name, tournament_id });
            await newTournamentGroup.save();

            res.status(201).json(newTournamentGroup);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    uptade: async (req, res) => {
        try {
            const { group_name, tournament_id } = req.body;
            if (!group_name || !tournament_id) {
                return res.status(400).json({ message: "Group name and tournament ID are required" });
            }

            const update = await TournamentGroup.findByIdAndUpdate(
                req.params.id,
                { group_name, tournament_id },
                { new: true }
            );

            if (!update) {
                return res.status(404).json({ message: "Tournament group not found" });
            }

            res.status(200).json(update);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const tournament_groups = await TournamentGroup.find()
                .populate("tournament_id", "tournament_name")
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
            res.status(200).json(tournament_groups);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const tournament_group = await TournamentGroup.findById(req.params.id);
            if (!tournament_group) {
                return res.status(404).json({ message: "Tournament group not found" });
            }
            res.status(200).json(tournament_group);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const tournament_group = await TournamentGroup.findByIdAndDelete(req.params.id);
            if (!tournament_group) {
                return res.status(404).json({ message: "Tournament group not found" });
            }
            res.status(200).json({ message: "Tournament group deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};