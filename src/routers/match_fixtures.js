import express from 'express';
import { MatchFixture } from '../model/match_fixtures.js';

const router = express.Router();
// Get all match fixtures
router.get('/', async (req, res) => {
    try {
        const match_fixtures = await MatchFixture.find();
        res.status(200).json(match_fixtures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a match fixture by ID
router.get('/:id', async (req, res) => {
    try {
        const match_fixture = await MatchFixture.findById(req.params.id);
        if (!match_fixture) {
            return res.status(404).json({ message: 'Match fixture not found' });
        }
        res.status(200).json(match_fixture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new match fixture
router.post('/', async (req, res) => {
    const match_fixture = new MatchFixture({
        match_date: req.body.match_date,
        tournament_id: req.body.tournament_id,
        team1_id: req.body.team1_id,
        team2_id: req.body.team2_id,
        score: req.body.score
    });

    try {
        const newMatchFixture = await match_fixture.save();
        res.status(201).json(newMatchFixture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a match fixture
router.put('/:id', async (req, res) => {
    try {
        const update = await MatchFixture.findByIdAndUpdate(
            req.params.id,
            {
                match_date: req.body.match_date,
                tournament_id: req.body.tournament_id,
                team1_id: req.body.team1_id,
                team2_id: req.body.team2_id,
                score: req.body.score
            },
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: 'Match fixture not found' });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a match fixture
router.delete('/:id', async (req, res) => {
    try {
        const match_fixture = await MatchFixture.findByIdAndDelete(req.params.id);
        if (!match_fixture) {
            return res.status(404).json({ message: 'Match fixture not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;