import styled from 'styled-components';
import { theme } from '../../utils/theme';
import { StyledButton } from '../CustomComponents/CustomComponents.css';

export const NavbarWrapper = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    height: 70px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${theme.background.main};
    box-shadow: 0 -10px 20px 5px ${theme.text.main};
    z-index: 3;
    gap: 20px;
    ${StyledButton} {
    }
    margin-bottom: 20px;
`;

export const DisplayName = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    border: 1px solid ${theme.text.main};
    padding: 5px 20px;
    border-radius: 4px;
    margin-left: auto;
    font-size: 14px;
    color: ${theme.text.main};
`;

export const AppName = styled.div`
    font-size: 24px;
    color: ${theme.text.white};
    span {
        font-size: 24px;
        color: ${theme.text.main};
    }
    &:hover {
        cursor: pointer;
    }
`;
export const MenuWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    a {
        font-size: 14px;
        color: ${theme.text.white};
        text-decoration: none;
        padding: 4px 18px;
        border-radius: 5px;
        border: 1px solid ${theme.text.white};
        &:hover {
            background-color: ${theme.text.white};
            color: ${theme.background.main};
        }
        transition: all ease-in-out 333ms;
        &.active {
            background-color: ${theme.text.white};
            color: ${theme.background.main};
        }
    }
`;
