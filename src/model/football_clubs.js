import mongoose from 'mongoose';

const footballClubSchema = new mongoose.Schema({
    club_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export const FootballClub = mongoose.model("FootballClub", footballClubSchema);