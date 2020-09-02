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
    optionbutton: {
        fontWeight: "normal",
        height: "100%",
        width: "100%",
    }
}));



const SudokuPopover = (props) => {
    const { handleClose, field } = props;
    const [Checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
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

        <Grid item xs={12} justify="center">
            <Grid key="options" item xs={12}>
            
    <FormGroup row>
                <FormControlLabel control={<Checkbox checked={Checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="Options" /></FormGroup>
            </Grid>
            <Grid key="clear" item xs={12}>
                <Button size="small" className={classes.optionbutton} onClick={() => setNumber("")}>Clear</Button>
            </Grid>
        </Grid>

    </Grid>
}

export default SudokuPopover;