import mongoose, { connect } from "mongoose";

const tournamentSchema = new mongoose.Schema({
    tournament_name: String,
    status: String
},
{
    timestamps: true
});

export const Tournament = mongoose.model("Tournament", tournamentSchema);
