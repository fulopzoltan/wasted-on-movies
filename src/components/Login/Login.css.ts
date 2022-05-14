import styled from 'styled-components';
import { theme } from '../../utils/theme';

export const LoginWrapper = styled.div`
    background-color: ${theme.background.main};
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
`;

export const LoginTitle = styled.div`
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    color: ${theme.text.white};
    span {
        font-size: 24px;
        color: ${theme.text.main};
    }
`;
