import * as mongoose from 'mongoose';

const scoresSchema = new mongoose.Schema({
    winner: {
        type: String
    },
    finished_at: {
        type: Date,
        default: Date.now
    }
});

const Scores = mongoose.model('Scores', scoresSchema);

export default Scores;