import express from 'express';
import {connectionDB } from './db/db.js';
import { TournamentRouter } from './routers/tournaments.js';
import { TgRouter } from './routers/tournament_groups.js';
import { TeamRouter } from './routers/teams.js';
import { PlayerRouter } from './routers/players.js';
import { ftRouter } from './routers/football_clubs.js';
// import { MatchRouter } from './routers/match_fixtures.js';


connectionDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/t-s', TournamentRouter);
app.use('/t-g', TgRouter);
app.use('/t', TeamRouter);
app.use('/p', PlayerRouter);
app.use('/f-c', ftRouter);
// app.use('/m-f', MatchRouter);  ishlamayapdi


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});