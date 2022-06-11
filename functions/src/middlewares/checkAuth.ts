import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';

// eslint-disable-next-line require-jsdoc
export async function checkAuth(req: Request | any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).send({ success: false, message: 'No Authorization header was found' });
        return;
    }
    const idToken = authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : authHeader;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (err) {
        res.send(401).send({ message: 'Unauthorized' });
        return;
    }
    next();
}
