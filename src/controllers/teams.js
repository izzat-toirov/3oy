import { Team } from '../model/teams.js';

export const getAllTeams = {
    create: async (req, res) => {
        try {
            const { team_name, club_id, group_id } = req.body;
            if (!team_name || !club_id || !group_id) {
                return res.status(400).json({ message: "Team name, club ID, and group ID are required" });
            }

            const newTeam = new Team({ team_name, club_id, group_id });
            await newTeam.save();

            res.status(201).json(newTeam);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    uptade: async (req, res) => {
        try {
            const { team_name, club_id, group_id } = req.body;
            if (!team_name || !club_id || !group_id) {
                return res.status(400).json({ message: "Team name and tournament ID are required" });
            }

            const update = await Team.findByIdAndUpdate(
                req.params.id,
                { team_name, club_id, group_id },
                { new: true }
            );

            if (!update) {
                return res.status(404).json({ message: "Team not found" });
            }

            res.status(200).json(update);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const teams = await Team.find()
                .populate("club_id", "tournament_name")
                .populate("group_id", "group_name")
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
            res.status(200).json(teams);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const team = await Team.findById(req.params.id);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            res.status(200).json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const team = await Team.findByIdAndDelete(req.params.id);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            res.status(200).json({ message: "Team deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};