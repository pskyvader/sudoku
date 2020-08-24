import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';


import SudokuPopover from './SudokuPopover';

const useStyles = makeStyles((theme) => ({
    button: {
        height: "100%",
        width: "100%",
        fontSize: "1em",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0,
        '&$disabled': {
            color: theme.palette.grey[500],
            backgroundColor: theme.palette.grey[200],
        },
    },
    error: {
        color: theme.palette.error.main,
        '&$disabled': {
            color: theme.palette.error.contrastText,
            backgroundColor: theme.palette.error.light
        },
    },
    disabled: {}
}));




export default function SudokuNumber({ field }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let { number, locked, error } = field;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [FinalNumber, SetFinalNumber] = React.useState(number);
    field.SetFinalNumber = SetFinalNumber;
    field.number = FinalNumber;

    const [FinalError, SetError] = React.useState(error);
    field.SetError = SetError;
    field.error = FinalError;

    const className = clsx(classes.button, FinalError && classes.error);

    if (locked) {
        return <Button disabled classes={{ root: className, disabled: classes.disabled, }}  >{FinalNumber}</Button>
    } else {
        return (
            <React.Fragment>
                <Button aria-describedby={id} className={className} onClick={handleClick}>{FinalNumber}</Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
                    <SudokuPopover handleClose={handleClose} field={field}></SudokuPopover>
                </Popover>
            </React.Fragment>
        );
    }
}
