import express from 'express';
import { Tournament } from '../model/tournaments.js';

const router = express.Router();

// Get all tournaments
router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a tournament by ID
router.get('/:id', async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new tournament
router.post('/', async (req, res) => {
    const tournament = new Tournament({
        tournament_name: req.body.tournament_name,
        status: req.body.status
    });

    try {
        const newTournament = await tournament.save();
        res.status(201).json(newTournament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a tournament
router.put('/:id', async (req, res) => {
    try {
        const uptade = Tournament.findByIdAndUpdate(
            req.params.id,
            {
                tournament_name: req.body.tournament_name,
                status: req.body.status
            },
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a tournament
router.delete('/:id', async (req, res) => {
    try {
        const deleteTournament = await Tournament.findByIdAndDelete(req.params.id);
        if (!deleteTournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json(deleteTournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;