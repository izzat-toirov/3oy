import mongoose from "mongoose";

const tournamentGroupSchema = new mongoose.Schema({
    tournament_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },
    group_name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export const TournamentGroup = mongoose.model("TournamentGroup", tournamentGroupSchema);
