import styled from 'styled-components';
import { Button, ButtonProps, TextField } from '@material-ui/core';
import { ButtonColors, theme } from '../../utils/theme';
interface IStyledButton {
    kind: ButtonColors;
}
export const StyledButton = styled(Button).attrs(({ kind }: IStyledButton & ButtonProps) => ({ kind }))`
    &.MuiButton-root {
        min-width: 120px;
    }
    &.MuiButton-contained {
        background-color: ${({ kind }) => theme.button?.[kind] || theme.button.DEFAULT};
        color: ${({ kind }) => (kind === 'PRIMARY' ? theme.text.white : theme.text.main)};
    }
`;

export const StyledTextField = styled(TextField)`
    label {
        font-size: 18px;
        color: ${theme.text.white};
    }
    label.Mui-focused {
        font-size: 18px;
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
`;
