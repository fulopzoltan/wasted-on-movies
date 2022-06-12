import styled from 'styled-components';
import { theme } from '../../utils/theme';
import { StyledButton } from '../CustomComponents/CustomComponents.css';

export const WatchlistWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 40px;
    justify-content: center;
    padding: 30px;
    background-color: ${theme.background.main};
`;
export const NoWatchlistEntry = styled.div`
    text-align: center;
    padding: 40px;
    font-size: 24px;
    color: ${theme.text.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    ${StyledButton} {
        width: fit-content;
    }
`;
export const ExpandIconHolder = styled.div`
    &:hover {
        cursor: pointer;
    }
    position: absolute;
    top: 20px;
    right: 20px;
    .MuiSvgIcon-root {
        width: 40px;
        height: 40px;
        color: ${theme.text.white};
    }
`;
export const WatchlistItemWrapper = styled.div<{ expanded?: boolean }>`
    background-color: ${theme.background.secondary};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    height: ${({ expanded }) => (expanded ? 'fit-content' : '333px')};
    box-shadow: 0 10px 20px 0 #000000;
    transition: height linear 300ms;
    img {
        padding: 0;
        margin: 0;
    }
`;

export const ItemTopSection = styled.div`
    color: ${theme.text.white};
    display: flex;
    flex-direction: row;
    gap: 20px;
    ${StyledButton} {
        width: max-content;
    }
`;
export const ExpandedContainer = styled.div<{ expanded: boolean }>`
    height: ${({ expanded }) => (expanded ? 'fit-content' : '0')};
    transition: height linear 300ms;
`;
