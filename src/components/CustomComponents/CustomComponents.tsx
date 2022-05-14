import React, { FC } from 'react';
import { StyledButton, StyledTextField } from './CustomComponents.css';
import { ButtonColors } from '../../utils/theme';
import { ButtonProps, TextFieldProps } from '@material-ui/core';

export const WOMButton: FC<{ kind: ButtonColors; text: string } & ButtonProps> = ({ kind, text, ...props }) => {
    return (
        <StyledButton variant={'contained'} kind={kind} {...props}>
            {text}
        </StyledButton>
    );
};

export const WOMTextField: FC<TextFieldProps> = ({ ...props }) => {
    return <StyledTextField variant={'outlined'} {...props} />;
};
