import express, { Request, Response } from 'express';
import cors from 'cors';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { checkAuth } from './middlewares/checkAuth';
// import serviceAccount from './wasted-on-movies-firebase-adminsdk-ffli0-cd2bccd7be.json';
import { applicationDefault } from 'firebase-admin/app';

const fbApp = admin.initializeApp({
    credential: applicationDefault()
});

const app = express();

// CORS
app.use(cors());
app.use(checkAuth);
// BASE ROUTE
app.get('/', (req: Request, res: Response) => {
    res.send('Service up and running!');
});

exports.api = functions.region('europe-west3').https.onRequest(app);
