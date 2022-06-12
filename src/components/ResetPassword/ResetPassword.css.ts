import styled from 'styled-components';
import { theme } from '../../utils/theme';

export const ResetPasswordWrapper = styled.div`
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

export const LoginInfoText = styled.div`
    text-align: center;
    line-height: 30px;
    color: ${theme.text.white};
    span {
        color: ${theme.text.main};
        &:hover {
            cursor: pointer;
        }
    }
    h1 {
        font-size: 18px;
        font-weight: bold;
        color: ${theme.text.main};
    }
`;
