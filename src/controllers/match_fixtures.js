import { MatchFixture } from '../model/match_fixtures.js';

export const getMatchFixturesController = {
    create: async (req, res) => {
        try {
            const { match_date, venue, home_team_id, away_team_id, tournament_id, match_status } = req.body;
            if (!match_date || !venue || !home_team_id || !away_team_id || !tournament_id || !match_status) {
                return res.status(400).json({ message: "Match date, venue, home team ID, away team ID, tournament ID, and match status are required" });
            }

            const newMatchFixture = new MatchFixture({ mmatch_date, venue, home_team_id, away_team_id, tournament_id, match_status });
            await newMatchFixture.save();

            res.status(201).json(newMatchFixture);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { match_date, venue, home_team_id, away_team_id, tournament_id, match_status } = req.body;
            if (!match_date || !venue || !home_team_id || !away_team_id || !tournament_id || !match_status) {
                return res.status(400).json({ message: "Match ID and fixture ID are required" });
            }

            const update = await MatchFixture.findByIdAndUpdate(
                req.params.id,
                { match_date, venue, home_team_id, away_team_id, tournament_id, match_status },
                { new: true }
            );

            if (!update) {
                return res.status(404).json({ message: "Match fixture not found" });
            }

            res.status(200).json(update);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const match_fixtures = await MatchFixture.find()
                .populate("home_team_id")
                .populate("away_team_id")
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
            res.status(200).json(match_fixtures);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const match_fixture = await MatchFixture.findById(req.params.id);
            if (!match_fixture) {
                return res.status(404).json({ message: "Match fixture not found" });
            }
            res.status(200).json(match_fixture);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const match_fixture = await MatchFixture.findByIdAndDelete(req.params.id);
            if (!match_fixture) {
                return res.status(404).json({ message: "Match fixture not found" });
            }
            res.status(200).json({ message: "Match fixture deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};