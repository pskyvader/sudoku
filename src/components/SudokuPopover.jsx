import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


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
        },
    },
}));



const SudokuPopover = (props) => {
    const { handleClose, field } = props;


    const classes = useStyles();
    const box = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    const key = "popover";

    const handleClick = (number) => {
        field.SetNumber(number);
        handleClose();
    };

    return <Grid container justify="center">
        {box.map((row, valuex) => {
            const keyx = key + "-" + valuex;
            return <Grid key={keyx} item xs={4}>
                {row.map((number, valuey) => {
                    const keyy = keyx + "," + valuey;
                    return <Grid key={keyy} item xs={12}>
                        <Button className={classes.button} onClick={() => handleClick(number)}>{number}</Button>
                    </Grid>
                })}
            </Grid>
        })}
        <Button className={classes.button} onClick={() => handleClick("")}>Clear</Button>
    </Grid>
}

export default SudokuPopover;