import mongoose from "mongoose";

const matchFixtureSchema = new mongoose.Schema({
    match_date: {
        type: Date,
        required: true
    },
    home_team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    away_team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    tournament_group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentGroup",
        required: true
    }
},
{
    timestamps: true
});

export const MatchFixture = mongoose.model("MatchFixture", matchFixtureSchema);