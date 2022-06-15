import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import {
    StyledButton,
    StyledCheckbox,
    StyledCheckboxWrapper,
    StyledDateInput,
    StyledSelectWrapper,
    StyledSnackbar,
    StyledTextField
} from './CustomComponents.css';
import { ButtonColors } from '../../utils/theme';
import { ButtonProps, CheckboxProps, TextFieldProps } from '@material-ui/core';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';
import { Alert, Slide, Snackbar } from '@mui/material';
import Select, { Props } from 'react-select';
import { getTodayDateString } from '../../utils/fnUtils';
export const WOMButton: FC<{ kind: ButtonColors; text: string } & ButtonProps> = ({ kind, text, ...props }) => {
    return (
        <StyledButton variant={'contained'} kind={kind} {...props}>
            {text}
        </StyledButton>
    );
};

export const WOMTextField: FC<{ errorMessage?: string } & TextFieldProps> = ({ errorMessage, ...props }) => {
    return (
        <StyledTextField
            variant={'outlined'}
            {...props}
            error={!!errorMessage}
            helperText={errorMessage ? `* ${errorMessage}` : ''}
            size={'small'}
        />
    );
};

export const WOMSelect: FC<Props> = ({ ...props }) => {
    return (
        <StyledSelectWrapper>
            <Select classNamePrefix="wom-select" {...props} />
        </StyledSelectWrapper>
    );
};

export const WOMCheckbox: FC<{ label?: string } & CheckboxProps> = ({ label, ...props }) => {
    return (
        <StyledCheckboxWrapper>
            <StyledCheckbox {...props} />
            {label}
        </StyledCheckboxWrapper>
    );
};

export const WOMSnackbar: FC<{ type?: 'error' | 'success' | 'info'; onCloseClick: any } & SnackbarProps> = ({
    type,
    onCloseClick,
    ...props
}) => {
    const renderAlert = () => {
        switch (type) {
            case 'error':
                return <Alert severity="error">{props.message}</Alert>;
            case 'success':
                return <Alert severity="success">{props.message}</Alert>;
            case 'info':
                return <Alert severity="info">{props.message}</Alert>;
            default:
                return <Alert severity="info">{'Unknown alert'}</Alert>;
        }
    };
    return (
        <Snackbar
            open={props.open}
            onClose={() => {
                onCloseClick();
            }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            TransitionComponent={(props) => <Slide {...props} direction={'up'} />}
            autoHideDuration={4000}
            {...props}
        >
            {renderAlert()}
        </Snackbar>
    );
};

export const WOMDatePicker: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
    return <StyledDateInput {...props} value={props.value || getTodayDateString()} type="date" />;
};
