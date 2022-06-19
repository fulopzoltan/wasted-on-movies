import styled from 'styled-components';
import { StyledButton, StyledTextField } from '../CustomComponents/CustomComponents.css';
import { theme } from '../../utils/theme';
import { icons } from '../../assets/icons/icons';

export const ReviewModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${StyledTextField} {
        position: absolute;
        bottom: 40px;
        width: calc(100% - 80px);
        .MuiOutlinedInput-root {
            width: 100%;
        }
    }
`;

export const ReviewsHolder = styled.div`
    overflow: auto;
    height: 530px;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
    gap: 20px;
`;

export const ReviewComment = styled.div`
    width: 100%;
    min-height: fit-content;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 10px 20px 0 #000000;
    border-radius: 5px;
    background: ${theme.background.secondary};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    color: ${theme.text.white};
`;

export const CommentAvatar = styled.div<{ url?: string }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: red;
    background-image: ${({ url }) => `url('${url}')`};
    background-size: cover;
`;
export const CommentText = styled.div`
    font-size: 12px;
    font-style: italic;
    word-wrap: anywhere;
    height: fit-content;
`;
export const ReviewerName = styled.div`
    font-size: 16px;
    font-weight: bold;
`;
export const NameTextHolder = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
`;
export const NoReviewMessage = styled.div`
    color: ${theme.text.white};
    font-size: 16px;
    opacity: 0.7;
    font-style: italic;
`;

export const ReviewDate = styled.span`
    font-size: 12px;
    opacity: 0.7;
    font-style: italic;
    font-weight: lighter;
    align-self: start;
`;
export const ActionsContainer = styled.div`
    display: flex;
    margin-left: auto;
    gap: 8px;
    ${StyledButton} {
        &.MuiButton-root {
            display: flex;
            justify-content: center;
            min-width: unset;
            padding-right: 12px;
            padding-left: 0;
            width: 40px;
        }
    }
`;
