import styled from 'styled-components';
import { theme } from '../../utils/theme';

export const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: ${theme.background.main};
    opacity: 0.6;
    cursor: progress;
    display: flex;
    align-items: center;
    justify-content: center;

    .loading-circle-1,
    .loading-circle-2 {
        z-index: 99999;
        position: absolute;
        content: ' ';
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: ${theme.text.main};
        -webkit-animation: sk-bounce 2s infinite ease-in-out;
        animation: sk-bounce 2s infinite ease-in-out;
    }
    .loading-circle-2 {
        opacity: 0.6;
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }
    @-webkit-keyframes sk-bounce {
        0%,
        100% {
            -webkit-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1);
        }
    }
    @keyframes sk-bounce {
        0%,
        100% {
            transform: scale(0);
            -webkit-transform: scale(0);
        }
        50% {
            transform: scale(1);
            -webkit-transform: scale(1);
        }
    }
`;
