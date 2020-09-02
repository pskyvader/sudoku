import React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const styledBy = (property, mapping) => (props) => mapping[props[property]];


const styles={
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
        color: styledBy('color', {
            default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        }),
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
    },
    label: {
        width: 0
    }
}


const useStyles = makeStyles((theme) => (styles));

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
    <Button className={classes.button} {...other} />
  ));


const SudokuPopover = (props) => {
    const { handleClose, field, Checked, setChecked } = props;

    const handleChange = () => {
        setChecked(!Checked);
    };

    const classes = useStyles();
    const box = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    const key = "popover";

    const setNumber = (number) => {
        field.SetNumber(number);
        handleClose();
    };

    return <Grid container justify="center" className="options">
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
                <StyledButton color={checked?"default":"blue"} classes={{ label: classes.label }} className={classes.options} onClick={handleChange}>
                    <Checkbox className={classes.checkbox} checked={Checked} onChange={handleChange} inputProps={{ 'aria-label': 'Option checkbox' }} disableRipple />
                    Options
                </StyledButton>
            </Grid>
            <Grid key="clear" item xs={12}>
                <Button className={classes.options} onClick={() => setNumber("")}>Clear</Button>
            </Grid>
        </Grid>

    </Grid>
}

export default SudokuPopover;