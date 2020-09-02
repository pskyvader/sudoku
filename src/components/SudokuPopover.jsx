import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
    const { primary, getContrastText } = theme.palette;
    return {
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
            color: primary.light,
        },
        label: {
            width: 0
        },
        optioncolor: {
            color: getContrastText(primary.light),
        },
        optionbackground: {
            backgroundColor: primary.light
        },
        checkedoption: {
            backgroundColor: primary.main
        }
    }
}


);



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
        field.options.add(number);
    };

    return <Grid container justify="center" className={clsx(Checked ? classes.optionbackground : "")} >
        {box.map((row, valuex) => {
            const keyx = key + "-" + valuex;
            return <Grid key={keyx} item xs={4}>
                {row.map((number, valuey) => {
                    const keyy = keyx + "," + valuey;
                    const classname = clsx(classes.button, optioncolor, Checked && field.options.has(number) ? classes.checkedoption : "");
                    return <Grid key={keyy} item xs={12}>
                        <Button className={classname} onClick={() => Checked ? setOptions(number) : setNumber(number)}>
                            {number}
                        </Button>
                    </Grid>
                })}
            </Grid>
        })}

        <Grid item xs={12}>
            <Grid item xs={12}>
                <Button classes={{ label: classes.label }} className={clsx(classes.options, optioncolor)} onClick={handleChange}>
                    <Checkbox color="default" className={clsx(classes.checkbox, optioncolor)} checked={Checked} onChange={handleChange} inputProps={{ 'aria-label': 'Option checkbox' }} disableRipple />
                    Options
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button className={clsx(classes.options, optioncolor)} onClick={() => setNumber("")}>Clear</Button>
            </Grid>
        </Grid>

    </Grid>
}

export default SudokuPopover;