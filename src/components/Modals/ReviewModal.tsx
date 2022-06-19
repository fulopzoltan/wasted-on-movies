import React, { useEffect, useState, FC } from 'react';
import { WOMButton, WOMModal, WOMTextField } from '../CustomComponents/CustomComponents';
import {
    ActionsContainer,
    CommentAvatar,
    CommentText,
    NameTextHolder,
    NoReviewMessage,
    ReviewComment,
    ReviewDate,
    ReviewerName,
    ReviewModalWrapper,
    ReviewsHolder
} from './ReviewModal.css';
import { Delete, Edit, Send } from '@material-ui/icons';
import { IconButton } from '@mui/material';
import { useAuth } from '../../providers/AuthContext';
import { useLoading } from '../../providers/LoadingContext';
import FirebaseAPI from '../../api/FirebaseAPI';
import { Review } from '../../types/Review';
import { icons } from '../../assets/icons/icons';

const ReviewModal: FC<{
    open: boolean;
    onClose: () => void;
    entryName?: string;
    entryId?: number;
    entryImage?: string;
}> = ({ open, onClose, entryName, entryId, entryImage }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [reviews, setReviews] = useState<any>([]);

    const [comment, setComment] = useState('');

    const { user, token } = useAuth();
    const { setLoading } = useLoading();

    useEffect(() => {
        loadReviews();
    }, [entryId]);
    const loadReviews = async () => {
        if (!entryId) return;
        try {
            setLoading(true);
            const response = await FirebaseAPI.getReview(token, entryId);
            setReviews(response.data);
            setLoading(false);
        } catch (error) {
            setReviews([]);
            setLoading(false);
            console.error(error);
        }
    };
    const sendReview = async () => {
        if (!comment) return;
        const review: Review = {
            id: '',
            entryId: entryId || 0,
            name: user?.displayName || user?.email || '(unknown)',
            userId: user?.uid || 'no-id',
            message: comment
        };

        try {
            setLoading(true);
            const response = await FirebaseAPI.addReview(token, review);
            setComment('');
            setLoading(false);
            loadReviews();
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };
    const deleteReview = async (reviewId: string) => {
        if (!entryId) return;
        try {
            setLoading(true);
            const response = await FirebaseAPI.deleteReview(token, entryId, reviewId);
            setComment('');
            setLoading(false);
            loadReviews();
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => setIsOpen(open), [open]);

    const renderReviews = () =>
        reviews?.length !== 0 ? (
            reviews.map((review: Review, index: number) => (
                <ReviewComment key={`review_${index}`}>
                    <CommentAvatar url={review.avatarURL || icons.userAvatar} />
                    <NameTextHolder>
                        <ReviewerName>
                            {review.name} <ReviewDate>{new Date(review?.date || 0).toLocaleDateString()}</ReviewDate>
                        </ReviewerName>
                        <CommentText>{review.message}</CommentText>
                    </NameTextHolder>
                    {user?.uid === review.userId && (
                        <ActionsContainer>
                            <WOMButton
                                kind={'PRIMARY'}
                                text={''}
                                endIcon={<Delete />}
                                onClick={() => deleteReview(review.id)}
                            />
                        </ActionsContainer>
                    )}
                </ReviewComment>
            ))
        ) : (
            <NoReviewMessage>There are no reviews! Be the first!</NoReviewMessage>
        );

    return (
        <WOMModal open={isOpen} onClose={() => onClose()}>
            <ReviewModalWrapper>
                <ReviewsHolder>{renderReviews()}</ReviewsHolder>
                <WOMTextField
                    label={'Leave a review'}
                    value={comment}
                    onChange={(evt) => setComment(evt.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton disabled={!comment}>
                                <Send />
                            </IconButton>
                        )
                    }}
                    onKeyUp={({ key }) => key === 'Enter' && sendReview()}
                />
            </ReviewModalWrapper>
        </WOMModal>
    );
};

export default ReviewModal;
