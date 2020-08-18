import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Sudoku from "../components/Sudoku";

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
        fontSize: "1rem",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0,
        padding: theme.spacing(1.5)
    },
}));



const SudokuPopover = (props) => {
    const { handleClose, field } = props;


    const classes = useStyles2();
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




export default function SudokuNumber(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let { number, locked } = props.field;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const [FinalNumber, SetFinalNumber] = React.useState(number);
    props.field.SetFinalNumber=SetFinalNumber;
    props.field.number=FinalNumber;
    if (locked) {
        return <Button disabled className={classes.button}>{FinalNumber}</Button>
    } else {
        return (
            <React.Fragment>
                <Button aria-describedby={id} className={classes.button} onClick={handleClick}>{FinalNumber}</Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
                    <SudokuPopover handleClose={handleClose} {...props}></SudokuPopover>
                </Popover>
            </React.Fragment>
        );
    }
}
