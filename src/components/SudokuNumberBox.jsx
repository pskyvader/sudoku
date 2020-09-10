import React, { lazy, Suspense } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const Paper = lazy(() => import('@material-ui/core/Paper'));
const ClickAwayListener = lazy(() => import('@material-ui/core/ClickAwayListener'));
const Grow = lazy(() => import('@material-ui/core/Grow'));
const Popper = lazy(() => import('@material-ui/core/Popper'));

const SudokuPopover = lazy(() => import('./SudokuPopover'));
const SudokuOptions = lazy(() => import('./SudokuOptions'));

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
            backgroundColor: theme.palette.error.main
        },
    },
    selected: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        "&:hover":{
            backgroundColor: theme.palette.primary.main,
        }
    },
    disabled: {},
    root: {
        zIndex: 1300
    }
}));




const SudokuNumber = ({ field, OptionsActive, setOptionsActive }) => {
    const classes = useStyles();
    const anchorRef = React.useRef(null);

    const [open, setOpen] = React.useState(false);

    const [ChangeOption, SetChangeOption] = React.useState(false);


    const handleClick = (event) => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let { number, locked, error, options } = field;

    const [FinalNumber, SetFinalNumber] = React.useState(number);
    field.SetFinalNumber = SetFinalNumber;
    field.number = FinalNumber;

    const [FinalError, SetError] = React.useState(error);
    field.SetError = SetError;
    field.error = FinalError;

    const [Options, SetOptions] = React.useState(options);
    field.SetOptions = SetOptions;
    field.options = Options;

    const className = clsx(classes.button, FinalError && classes.error, open && classes.selected,ChangeOption);

    if (locked) {
        return (
            <Button disabled classes={{ root: className, disabled: classes.disabled, }}  >
                <Suspense fallback={renderLoader()}>
                    <SudokuOptions options={Options}> {FinalNumber}</SudokuOptions>
                </Suspense>
            </Button>
        )
    } else {
        return (
            <React.Fragment>
                <Button ref={anchorRef} className={className} onClick={handleClick}>
                    <Suspense fallback={renderLoader()}>
                        <SudokuOptions options={Options}> {FinalNumber}</SudokuOptions>
                    </Suspense>
                </Button>
                <Suspense fallback={renderLoader()}>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition className={classes.root}>
                        {({ TransitionProps, placement }) => (
                            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
                                <div>
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <div>
                                                <SudokuPopover handleClose={handleClose} field={field} OptionsActive={OptionsActive} setOptionsActive={setOptionsActive} parentOptions={SetChangeOption}/>
                                            </div>
                                        </ClickAwayListener>
                                    </Paper>
                                </div>
                            </Grow>
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

    return <Box height={height} width="100%" fontSize={fontsize} display="flex" alignItems="center" justifyContent="center">
        <SudokuNumber {...props} />
    </Box>
}

export default SudokuNumberBox;