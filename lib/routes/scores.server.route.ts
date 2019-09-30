import ScoresCtrl from '../controllers/scores.server.controller';

export class Routes { 
    public scoresCtrl: ScoresCtrl = new ScoresCtrl();

    public routes(app): void {   

        app.route('/api/scores')
            .get(this.scoresCtrl.getAllScores);
        
        app.route('/api/score')
            .post(this.scoresCtrl.insertScore);
    }
}