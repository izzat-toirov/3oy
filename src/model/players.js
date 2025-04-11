import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    date_of_birth: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export const Player = mongoose.model("Player", playerSchema);