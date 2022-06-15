import styled from 'styled-components';
import { theme } from '../../utils/theme';

export const AnalyticsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
`;

export const WatchtimesHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
    svg {
        width: 30px;
        height: 30px;
        color: ${theme.text.main};
    }
`;

export const Watchtime = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 24px;
    span {
        color: ${theme.text.main};
        font-size: 12px;
    }
    text-align: center;
    color: ${theme.text.white};
    padding: 14px 18px;
    box-sizing: border-box;
    border: 1px solid ${theme.text.main};
    border-radius: 4px;
`;

export const ChartTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: ${theme.text.white};
`;
export const ChartWrapper = styled.div`
    align-self: center;
    height: 400px;
    width: 400px;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 10px 20px 0 #000000;
    background-color: ${theme.background.secondary};
`;
