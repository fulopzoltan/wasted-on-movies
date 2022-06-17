import { Router } from 'express';
import admin, { firestore } from 'firebase-admin';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/', async (req, res, next) => {
    const uid = res.locals.userUid;
    const watchlistSnapshot = await firestore().collection('watchlist').doc(`user-${uid}`);
    const watchlistData = (await watchlistSnapshot.get()).data() || {};
    const watchlist = Object.values(watchlistData);
    res.send({ success: true, data: watchlist });
});
router.get('/addedIds', async (req, res, next) => {
    const uid = res.locals.userUid;
    const watchlistSnapshot = await firestore().collection('watchlist').doc(`user-${uid}`);
    const watchlistData = (await watchlistSnapshot.get()).data() || {};
    const watchlistIds = Object.keys(watchlistData);
    res.send({ success: true, data: watchlistIds });
});
router.get('/:id', (req, res, next) => {
    res.send({ success: true });
});
router.post('/', async (req, res, next) => {
    const watchlistSnapshot = firestore().collection('watchlist');
    const uid = res.locals.userUid;
    await watchlistSnapshot.doc(`user-${uid}`).set({ [req.body.id]: req.body }, { merge: true });
    res.send({ success: true, data: 'Successfully added to watchlist!' });
});
router.put('/:id', async (req, res, next) => {
    const watchlistSnapshot = firestore().collection('watchlist');
    const uid = res.locals.userUid;
    await watchlistSnapshot.doc(`user-${uid}`).set({ [req.params.id]: req.body }, { merge: true });
    res.send({ success: true, data: 'Successfully updated watchlist entry!' });
});
router.delete('/:id', async (req, res, next) => {
    const watchlistSnapshot = firestore().collection('watchlist');
    const uid = res.locals.userUid;
    await watchlistSnapshot.doc(`user-${uid}`).update({ [req.params.id]: admin.firestore.FieldValue.delete() });
    res.send({ success: true, data: 'Successfully deleted watchlist entry!' });
    res.send({ success: true });
});

export default router;
