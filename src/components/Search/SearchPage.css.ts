import styled, { css } from 'styled-components';
import { theme } from '../../utils/theme';
import { IconButton } from '@mui/material';

export const SearchPageWrapper = styled.div`
    min-height: calc(100vh - 130px);
    background: ${theme.background.main};
    color: ${theme.text.white};
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    position: relative;
`;

export const SearchResultWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const SearchFieldWrapper = styled.div<{ noSearch?: boolean }>`
    transition: all linear 300ms;
    ${({ noSearch }) =>
        noSearch
            ? css`
                  position: absolute;
                  transform: translate(-50%);
                  margin-left: 50%;
                  top: 50%;
              `
            : ''}
`;

export const NoResult = styled.div`
    color: ${theme.text.white};
    opacity: 0.7;
    font-style: italic;
`;

export const DetailViewWrapper = styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 40px;
    position: relative;
    section {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }
`;
export const SeasonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    padding-left: 30px;
`;

export const SeasonCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    div {
        text-align: center;
    }
`;
export const LeftSection = styled.div``;
export const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding-bottom: 10px;
`;
export const AssetName = styled.div`
    font-weight: bold;
    font-size: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    span {
        font-weight: lighter;
        font-style: italic;
        font-size: 12px;
    }
`;
export const AssetOverview = styled.div`
    width: 400px;
    height: 100px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;
export const AssetRuntime = styled.div`
    font-weight: bold;
    color: ${theme.text.white};
    background-color: ${theme.text.main};
    width: fit-content;
    height: fit-content;
    padding: 6px 8px;
    border-radius: 10px;
`;

export const GenreWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;
export const AssetGenre = styled.div`
    font-weight: bold;
    color: ${theme.background.main};
    background-color: ${theme.text.white};
    width: fit-content;
    padding: 6px 8px;
    border-radius: 10px;
`;
