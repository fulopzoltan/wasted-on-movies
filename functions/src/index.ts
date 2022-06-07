import express, { Request, Response } from 'express';
import cors from 'cors';
import * as functions from 'firebase-functions';
import { checkAuth } from './middlewares/checkAuth';

const app = express();

// CORS
app.use(cors());
app.use(checkAuth);
// BASE ROUTE
app.get('/', (req: Request, res: Response) => {
    res.send('Service up and running!');
});

exports.api = functions.region('europe-west3').https.onRequest(app);
