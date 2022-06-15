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
export const TopRightActions = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;
export const ExpandIconHolder = styled.div`
    &:hover {
        cursor: pointer;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    color: ${theme.text.white};
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
    transition: all linear 300ms;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const SeasonSelectHolder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
`;

export const SeasonContainer = styled.div`
    color: ${theme.text.white};
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const EpisodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`;
export const EpisodeInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
export const EpisodeName = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

export const RuntimeActionHolder = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
`;
export const EpisodeOverview = styled.div`
    font-size: 12px;
    max-width: 50%;
    height: 50px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const LikeButton = styled.div`
    .MuiRadio-root {
        opacity: 0.3;
        &.Mui-checked {
            opacity: 1;
        }
    }
    svg {
        color: green;
    }
`;
export const DislikeButton = styled.div`
    svg {
        color: ${theme.text.main};
    }
    .MuiRadio-root {
        opacity: 0.15;
        &.Mui-checked {
            opacity: 1;
        }
    }
`;
