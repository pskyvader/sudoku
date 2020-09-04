// import React from 'react';

import clsx from 'clsx';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';


// import SudokuPopover from './SudokuPopover';
// import SudokuOptions from './SudokuOptions';


import React, { lazy, Suspense } from 'react';
const SudokuPopover = lazy(() => import('./SudokuPopover'));
const SudokuOptions = lazy(() => import('./SudokuOptions'));
const Button = lazy(() => import('@material-ui/core/Button'));
const Popover = lazy(() => import('@material-ui/core/Popover'));


const renderLoader = () => null;


const useStyles = makeStyles((theme) => ({
    button: {
        height: "100%",
        width: "100%",
        fontSize: "1em",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0,
        padding: 0,
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




const SudokuNumber = ({ field, Checked, setChecked }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let { number, locked, error, options } = field;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [FinalNumber, SetFinalNumber] = React.useState(number);
    field.SetFinalNumber = SetFinalNumber;
    field.number = FinalNumber;

    const [FinalError, SetError] = React.useState(error);
    field.SetError = SetError;
    field.error = FinalError;

    const [Options, SetOptions] = React.useState(options);
    field.SetOptions = SetOptions;
    field.options = Options;

    const className = clsx(classes.button, FinalError && classes.error);

    if (locked) {
        return <Suspense fallback={renderLoader()}>
            <Button disabled classes={{ root: className, disabled: classes.disabled, }}  >
                <SudokuOptions options={field.options}> {FinalNumber}</SudokuOptions>
            </Button>
        </Suspense >
    } else {
        return (
            <React.Fragment>
                <Suspense fallback={renderLoader()}>
                    <Button aria-describedby={id} className={className} onClick={handleClick}>
                        <SudokuOptions options={field.options}> {FinalNumber}</SudokuOptions>
                    </Button>
                </Suspense>
                <Suspense fallback={renderLoader()}>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
                        <SudokuPopover handleClose={handleClose} field={field} Checked={Checked} setChecked={setChecked} />
                    </Popover>
                </Suspense>
            </React.Fragment>
        );
    }
}



const SudokuNumberBox = (props) => {
    const { height } = props;
    let fontsize = height * .75;
    if (fontsize > 50) {
        fontsize = 50;
    }

    return <Box height={height} width="100%" fontSize={fontsize} display="flex" alignItems="center" justifyContent="center">
        <SudokuNumber {...props} />
    </Box>
}

export default SudokuNumberBox;