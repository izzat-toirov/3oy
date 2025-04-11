import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentGroup",
        required: true
    },
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FootballClub",
        required: true
    },
    coach_name: {
            type: String,
            required: true
    }
},
{
    timestamps: true
});

export const Team = mongoose.model("Team", teamSchema);