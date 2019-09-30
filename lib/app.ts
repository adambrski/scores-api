/**
 * Module dependencies
 */
import * as dotenv from 'dotenv';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/scores.server.route";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';

class App {

    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        dotenv.load({ path: '.env' });
        this.config();        
        this.route.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', "false");
            next();
        });
    }

    private mongoSetup(): void{
        let mongoUrl;
        if (process.env.NODE_ENV === 'test') {
            mongoUrl = process.env.MONGODB_TEST_URI;
        } else {
            mongoUrl = process.env.MONGODB_URI;
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(db => {
                console.log('Connected to MongoDB');
            })
            .catch(err => console.error(err));     
    }

}

export default new App().app;