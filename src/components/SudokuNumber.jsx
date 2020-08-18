import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    button: {
        height: "100%",
        width: "100%",
        fontSize: "1em",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0
    },
}));


const useStyles2 = makeStyles((theme) => ({
    button: {
        height: "100%",
        width: "100%",
        fontSize:"1rem",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0,
        padding:theme.spacing(1.5)
    },
}));



const SudokuPopover = () => {
    const classes = useStyles2();
    const box = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    const key = "popover";
    return <Grid container justify="center">
        {box.map((row, valuex) => {
            const keyx = key + "-" + valuex;
            return <Grid key={keyx} item xs={4}>
                {row.map((column, valuey) => {
                    const keyy = keyx + "," + valuey;
                    return <Grid key={keyy} item xs={12}>
                        <Button className={classes.button}>{column}</Button>
                    </Grid>
                })}
            </Grid>
        })}
        <Button className={classes.button}>Clear</Button>
    </Grid>
}




export default function SimplePopover({ field }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { number, options, i, j, x, y, locked } = field;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const finalnumber = number !== 0 ? number : "";

    if (locked) {
        return <Button disabled className={classes.button}>{finalnumber}</Button>
    } else {
        return (
            <React.Fragment>
                <Button aria-describedby={id} className={classes.button} onClick={handleClick}>{finalnumber}</Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
                    <SudokuPopover></SudokuPopover>
                </Popover>
            </React.Fragment>
        );
    }
}
