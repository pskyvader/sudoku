import React, { lazy, Suspense, useContext } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

import SudokuOptions from './SudokuOptions';
import { BoardContext } from '../ContextProviders/BoardContext';
import { TimerContext } from '../ContextProviders/TimerContext';

const SudokuPopover = lazy(() => import('./SudokuPopover'));

const renderLoader = () => null;


const useStyles = makeStyles((theme) => {
    const { primary, error, secondary, getContrastText, background, grey } = theme.palette;
    const light = theme.palette.mode === "light";
    return {
        button: {
            height: "100%",
            width: "100%",
            fontSize: "1em",
            fontWeight: "normal",
            minWidth: 0,
            borderRadius: 0,
            padding: 0,
            color: light ? null : getContrastText(background.paper),
            '&$disabled': {
                color: light ? grey[500] : grey[300],
                backgroundColor: light ? grey[200] : grey[800],
            },
        },
        focused: {
            backgroundColor: secondary.main,
            color: getContrastText(secondary.main),
            '&$disabled': {
                backgroundColor: secondary.light,
                color: getContrastText(secondary.light),
            },
        },
        error: {
            color: error.main,
            '&$disabled': {
                color: error.contrastText,
                backgroundColor: error.main
            },
        },
        selected: {
            backgroundColor: primary.light,
            color: getContrastText(primary.light),
            "&:hover": {
                backgroundColor: primary.main,
            }
        },
        disabled: {},
        popper: {
            zIndex: 1300
        },
    }
});




const SudokuNumber = ({ field }) => {
    const { SaveBoard } = useContext(BoardContext);
    const { IsTimerActive, IsFocused } = useContext(TimerContext);
    const classes = useStyles();
    const anchorRef = React.useRef(null);

    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
        SaveBoard();
    };


    let { number, locked, error, options, focused } = field;

    const [FinalNumber, SetFinalNumber] = React.useState(number);
    field.SetFinalNumber = SetFinalNumber;
    field.number = FinalNumber;

    const [FinalError, SetError] = React.useState(error);
    field.SetError = SetError;
    field.error = FinalError;


    const [Focused, SetFocused] = React.useState(focused);
    field.SetFocused = SetFocused;
    field.focused = Focused;

    const [Options, SetOptions] = React.useState(options);
    field.SetOptions = SetOptions;
    field.options = Options;

    const className = clsx(classes.button, open && classes.selected, focused && classes.focused, FinalError && classes.error);
    if (locked) {
        return (
            <Button disabled classes={{ root: className, disabled: classes.disabled, }}  >
                <SudokuOptions options={Options}> {FinalNumber}</SudokuOptions>
            </Button>
        )
    } else {
        return (
            <React.Fragment>
                <Button ref={anchorRef} className={className} onClick={handleClick}>
                    <SudokuOptions options={Options}> {FinalNumber}</SudokuOptions>
                </Button>
                <Suspense fallback={renderLoader()}>
                    <Popper open={open && IsFocused && IsTimerActive} anchorEl={anchorRef.current} transition className={classes.popper}  >
                        {({ TransitionProps, placement }) => (
                            <SudokuPopover
                                TransitionProps={TransitionProps}
                                placement={placement}
                                handleClose={handleClose}
                                field={field}
                            />
                        )}
                    </Popper>
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

    return <Box sx={{
        width: "100%",
        height: height,
        fontSize: fontsize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}
    >
        <SudokuNumber {...props} />
    </Box>
}

export default SudokuNumberBox;