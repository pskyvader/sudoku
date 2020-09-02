import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';


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
    options: {
        height: "100%",
        width: "100%",
        fontSize: "1rem",
        fontWeight: "normal",
        margin: 0
    },
    checkbox:{
        padding:0,
        paddingRight:theme.spacing(1),
    },
    label:{
        width:0
    }
}));



const SudokuPopover = (props) => {
    const { handleClose, field } = props;
    const [Checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(!Checked);
    };

    const classes = useStyles();
    const box = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    const key = "popover";

    const setNumber = (number) => {
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
                        <Button className={classes.button} onClick={() => setNumber(number)}>{number}</Button>
                    </Grid>
                })}
            </Grid>
        })}

        <Grid item xs={12}>
            <Grid key="options" item xs={12}>
                <Button classes={{label:classes.label}}  className={classes.options} onClick={handleChange}>
                    <Checkbox className={classes.checkbox} checked={Checked} color="primary" onChange={handleChange} inputProps={{ 'aria-label': 'Option checkbox' }} disableRipple />
                    Options
                </Button>
            </Grid>
            <Grid key="clear" item xs={12}>
                <Button className={classes.options} onClick={() => setNumber("")}>Clear</Button>
            </Grid>
        </Grid>

    </Grid>
}

export default SudokuPopover;