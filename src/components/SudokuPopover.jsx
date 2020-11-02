import React,{useContext} from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';


import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import Text from '../languages/Language';

import { BoardContext } from '../ContextProviders/BoardContext';

const useStyles = makeStyles((theme) => {
    const { primary, secondary, getContrastText, background } = theme.palette;
    const light = theme.palette.type === "light";

    return {
        button: {
            height: "100%",
            width: "100%",
            fontSize: "1em",
            fontWeight: "normal",
            minWidth: 0,
            borderRadius: 0,
            padding: theme.spacing(1),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(1.5)
            },
            "&:hover": {
                backgroundColor: light ? primary.main : primary.light,
                color: primary.contrastText
            },
            color: light ? primary.main : getContrastText(background.paper)
        },
        options: {
            height: "100%",
            width: "100%",
            fontWeight: "normal",
            margin: 0,
            borderRadius: 0,
            color: light ? primary.main : getContrastText(background.paper),
            "&:hover": {
                backgroundColor: light ? primary.main : primary.light,
                color: primary.contrastText
            }
        },
        label: {
            width: 0,
        },
        optioncolor: {
            color: getContrastText(primary.light),
            "&:hover": {
                backgroundColor: primary.light,
            }
        },
        optionbackground: {
            backgroundColor: primary.main
        },
        OptionsActiveoption: {
            backgroundColor: secondary.main,
            "&:hover": {
                backgroundColor: secondary.light,
            }
        }
    }
});



const SudokuPopover = (props) => {
    const { handleClose, field, parentOptions } = props;
    const {OptionsActive,setOptionsActive}=useContext(BoardContext);
    const [ChangeOption, SetChangeOption] = React.useState(false);
    const handleChange = () => {
        setOptionsActive(!OptionsActive);
    };

    const classes = useStyles();
    const optioncolor = OptionsActive ? classes.optioncolor : "";
    const box = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    const key = "popover";

    const Clear = () => {
        field.options.clear();
        field.SetNumber("");
        handleClose();
    }

    const setNumber = (number) => {
        field.options.clear();
        field.SetNumber(number);
        handleClose();
    };

    const changeOptions = (number) => {
        if (field.options.has(number)) {
            field.options.delete(number);
        } else {
            field.options.add(number);
        }
        parentOptions(!ChangeOption);
        SetChangeOption(!ChangeOption);
    };

    const pressNumber = (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
            Clear();
        } else {
            const pressednumber = parseInt(event.key);
            if (!isNaN(pressednumber)) {

                if (OptionsActive) {
                    changeOptions(pressednumber);
                } else {
                    setNumber(pressednumber);
                }
            }
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", pressNumber, false);
        return () => {
            document.removeEventListener("keydown", pressNumber, false);
        };
    });


    return <Grid container justify="center" className={clsx(OptionsActive && classes.optionbackground )} >
        {box.map((row, valuex) => {
            const keyx = key + "-" + valuex;
            return <Grid key={keyx} item xs={4}>
                {row.map((number, valuey) => {
                    const keyy = keyx + "," + valuey;
                    const classname = clsx(classes.button, optioncolor, OptionsActive && field.options.has(number) ? classes.OptionsActiveoption : "");
                    return <Grid key={keyy}>
                        <Button className={classname} onClick={() => OptionsActive ? changeOptions(number) : setNumber(number)}>
                            {number}
                        </Button>
                    </Grid>
                })}
            </Grid>
        })}

        <Grid item xs={12}>
            <Grid item xs={12}>
                <Button classes={{ label: classes.label }} className={clsx(classes.options, optioncolor)} onClick={handleChange}>
                    <Switch
                        edge="start"
                        size="small"
                        disableRipple
                        onChange={handleChange}
                        checked={OptionsActive}
                    />
                    {Text('options')}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button className={clsx(classes.options, optioncolor)} onClick={() => Clear()}>{Text('clear')}</Button>
            </Grid>
        </Grid>

    </Grid>
}

// export default SudokuPopover;


const SudokuPopoverContainer = (props) => {
    const { TransitionProps, placement, handleClose } = props;
    return (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
            <div>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div>
                            <SudokuPopover {...props} />
                        </div>
                    </ClickAwayListener>
                </Paper>
            </div>
        </Grow>
    )
}
export default SudokuPopoverContainer;
