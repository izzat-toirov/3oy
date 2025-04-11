import express from 'express';
import { Player } from '../model/players.js';

const router = express.Router();
// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find().populate('team_id');
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a player by ID
router.get('/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id).populate('team_id');
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new player
router.post('/', async (req, res) => {
    const player = new Player({
        player_name: req.body.player_name,
        team_id: req.body.team_id,
        position: req.body.position,
        age: req.body.age
    });

    try {
        const newPlayer = await player.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a player
router.put('/:id', async (req, res) => {
    try {
        const update = await Player.findByIdAndUpdate(
            req.params.id,
            {
                player_name: req.body.player_name,
                team_id: req.body.team_id,
                position: req.body.position,
                age: req.body.age
            },
            { new: true }
        );
        if (!update) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a player
router.delete('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(204).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;