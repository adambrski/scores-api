import Scores from '../models/scores.server.model';

export default class ScoresCtrl {
    getAllScores = async (req, res) => {
        try {
          const docs = await Scores.find({});
          res.status(200).json(docs);
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
    }

    insertScore = async (req, res) => {
        try {
          const obj = await new Scores(req.body).save();
          res.status(201).json(obj);
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
    }
}

