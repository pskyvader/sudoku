import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        height: "100%",
        width: "100%",
        fontSize: "1rem",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0,
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(1.5)
        }
    },
    options: {
        height: "100%",
        width: "100%",
        fontWeight: "normal",
        margin: 0
    },
    checkbox: {
        padding: 0,
        paddingRight: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    label: {
        width: 0
    },
    optioncolor: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    optionbackground: {
        backgroundColor: theme.palette.primary.main
    }
}));



const SudokuPopover = (props) => {
    const { handleClose, field, Checked, setChecked } = props;

    const handleChange = () => {
        setChecked(!Checked);
    };

    const classes = useStyles();
    const optioncolor = Checked ? classes.optioncolor : "";
    const box = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    const key = "popover";

    const setNumber = (number) => {
        field.SetNumber(number);
        handleClose();
    };
    const setOptions = (number) => {
        console.log(field.options);
        field.options.add(number);
        console.log(number);
    };

    return <Grid container justify="center" className={clsx(Checked ? classes.optionbackground : "")} >
        {box.map((row, valuex) => {
            const keyx = key + "-" + valuex;
            return <Grid key={keyx} item xs={4}>
                {row.map((number, valuey) => {
                    const keyy = keyx + "," + valuey;
                    return <Grid key={keyy} item xs={12}>
                        <Button className={clsx(classes.button, optioncolor)} onClick={() => Checked ? setOptions(number) : setNumber(number)}>{number}</Button>
                    </Grid>
                })}
            </Grid>
        })}

        <Grid item xs={12}>
            <Grid key="options" item xs={12}>
                <Button classes={{ label: classes.label }} className={clsx(classes.options, optioncolor)} onClick={handleChange}>
                    <Checkbox color="default" className={clsx(classes.checkbox, optioncolor)} checked={Checked} onChange={handleChange} inputProps={{ 'aria-label': 'Option checkbox' }} disableRipple />
                    Options
                </Button>
            </Grid>
            <Grid key="clear" item xs={12}>
                <Button className={clsx(classes.options, optioncolor)} onClick={() => setNumber("")}>Clear</Button>
            </Grid>
        </Grid>

    </Grid>
}

export default SudokuPopover;