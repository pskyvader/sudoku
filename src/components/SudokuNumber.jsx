import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
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
    error:{
        color:"red",
        '&$disabled': {
            color: 'red',
        },
    },
    disabled:{}
}));


const useStyles2 = makeStyles((theme) => ({
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




export default function SudokuNumber({ field }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let { number, locked,error } = field;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [FinalNumber, SetFinalNumber] = React.useState(number);
    field.SetFinalNumber = SetFinalNumber;
    field.number = FinalNumber;

    const className = clsx(classes.button, error && classes.error);
    console.log(className);


    if (locked) {
        return <Button disabled className={className} classes={{ root: classes.error, disabled: error && classes.disabled, }}  >{FinalNumber}</Button>
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
