import styled from 'styled-components';
import { Button, ButtonProps, Checkbox, Snackbar, TextField } from '@material-ui/core';
import { ButtonColors, theme } from '../../utils/theme';
interface IStyledButton {
    kind: ButtonColors;
}
export const StyledButton = styled(Button).attrs(({ kind }: IStyledButton & ButtonProps) => ({ kind }))`
    &.MuiButton-root {
        height: 34px;
        min-width: 120px;
    }
    &.MuiButton-contained {
        background-color: ${({ kind }) => theme.button?.[kind] || theme.button.DEFAULT};
        color: ${({ kind }) => (kind === 'PRIMARY' ? theme.text.white : theme.text.main)};
        &.Mui-disabled {
            opacity: 0.5;
            background-color: ${theme.background.secondary};
            color: ${({ kind }) => (kind === 'PRIMARY' ? theme.text.white : theme.text.main)};
        }
    }
`;

export const StyledTextField = styled(TextField)`
    label {
        font-size: 15px;
        color: ${theme.text.white};
    }
    label.Mui-focused {
        font-size: 15px;
        color: ${theme.text.white};
    }
    .MuiOutlinedInput-root {
        color: ${theme.text.white};
        width: 400px;
        fieldset {
            border-color: ${theme.text.main};
        }
        &:hover fieldset {
            border-color: ${theme.text.main};
        }
        &.Mui-focused fieldset {
            border-color: ${theme.text.main};
        }
    }
    .MuiInputAdornment-root {
        svg {
            path {
                color: ${theme.text.white};
            }
        }
    }
`;

export const StyledSelectWrapper = styled.div`
    width: 200px;

    [class*='-control'] {
        background-color: ${theme.background.secondary};
        color: ${theme.text.white};
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    [class*='-menu'] {
        background-color: ${theme.background.secondary};
        color: ${theme.text.white};
    }
    [class*='-singleValue'] {
        color: ${theme.text.white};
    }
    [class*='-MenuList'] {
        &::-webkit-scrollbar {
            width: 6px;
            background: #121212;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #e50914;
            border-radius: 3px;
        }
    }
    [class*='indicatorSeparator'] {
        display: none;
    }
    [class*='-option'] {
        background-color: ${theme.background.secondary};
        &:hover {
            background-color: ${theme.text.main};
        }
    }
`;
export const StyledCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.text.white};
    &:hover {
        cursor: pointer;
    }
`;
export const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
        color: rgba(255, 255, 255, 0.2);
    }
    &.MuiCheckbox-colorSecondary.Mui-checked {
        color: ${theme.text.main};
    }
    .MuiTouchRipple-root {
        color: ${theme.text.main};
    }
`;
export const StyledSnackbar = styled(Snackbar)``;

export const StyledDateInput = styled.input`
    width: 120px;
    padding: 3px 6px;
    background-color: ${theme.background.secondary};
    border: 1px solid ${theme.text.main};
    color: ${theme.text.white};
    border-radius: 4px;
    ::-webkit-calendar-picker-indicator {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        opacity: 0.3;
    }
    transition: opacity ease-in-out 300ms;
    color-scheme: dark;
`;
