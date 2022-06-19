import { Router } from 'express';
import admin, { firestore } from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

// eslint-disable-next-line new-cap
const router = Router();
async function getUserPhoto(userId: string) {
    const userPhoto = await admin
        .auth()
        .getUser(userId)
        .then((userRecord) => {
            return userRecord?.photoURL || '';
        });
    return userPhoto;
}

router.get('/:id', async (req, res, next) => {
    const entryId = req.params.id;
    const reviewSnapshot = await firestore().collection('review').doc(`entry-${entryId}`);
    const reviewsData = (await reviewSnapshot.get()).data() || {};
    const reviews = Object.values(reviewsData);
    for (const review of reviews) {
        review.avatarURL = await getUserPhoto(review.userId);
    }
    res.send({ success: true, data: reviews.sort((a, b) => (a.date < b.date ? 1 : -1)) });
});
router.post('/', async (req, res, next) => {
    const reviewSnapshot = firestore().collection('review');
    const uid = res.locals.userUid;
    const commentId = uuidv4();
    const comment = { id: commentId, userId: uid, name: req.body.name, message: req.body.message, date: Date.now() };
    await reviewSnapshot.doc(`entry-${req.body.entryId}`).set({ [commentId]: comment }, { merge: true });
    res.send({ success: true, data: 'Successfully added review!' });
});

router.delete('/:id', async (req, res, next) => {
    const reviewSnapshot = firestore().collection('review');
    await reviewSnapshot
        .doc(`entry-${req.body.entryId}`)
        .update({ [req.params.id]: admin.firestore.FieldValue.delete() });
    res.send({ success: true, data: 'Successfully deleted review!' });
});

export default router;
