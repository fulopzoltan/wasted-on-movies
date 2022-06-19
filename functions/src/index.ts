import express, { Request, Response } from 'express';
import cors from 'cors';
import * as functions from 'firebase-functions';
import { checkAuth } from './middlewares/checkAuth';
import watchlist from './watchlist';
import review from './review';
import * as admin from 'firebase-admin';
// import { getFirestore } from 'firebase/firestore';

admin.initializeApp();
// const db = getFirestore(adminApp);

const app = express();
// export const DB = getFirestore();
// CORS
app.use(cors());
// Auth middleware
app.use(checkAuth);

// Watchlist CRUD
app.use('/watchlist', watchlist);
app.use('/review', review);

// BASE ROUTE
app.get('/', (req: Request, res: Response) => {
    res.send('Service up and running!');
});

exports.api = functions.region('europe-west3').https.onRequest(app);
