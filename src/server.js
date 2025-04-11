import express from 'express';
import mongoose from 'mongoose';
import tournamentRouter from './routers/tournaments.js';
import tgRouter from './routers/tournament_groups.js';
import fcRouter from './routers/football_clubs.js';
import teamsRouter from './routers/teams.js';
import playerRouter from './routers/players.js';
import matchRouter from './routers/match_fixtures.js';

mongoose.connect('mongodb://localhost:27017/tournamentDB').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/t-s', tournamentRouter);
app.use('/t-g', tgRouter);
app.use('/f-c', fcRouter);
app.use('/t-e', teamsRouter);
app.use('/p-l', playerRouter);
app.use('/m-f', matchRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});