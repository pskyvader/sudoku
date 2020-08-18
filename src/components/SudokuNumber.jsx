import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    button: {
        height: "100%",
        width: "100%",
        fontSize: "1em",
        fontWeight: "normal",
        minWidth: 0,
        borderRadius: 0
    },
}));




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
    }
    else {
        return (
            <React.Fragment  className={classes.button}>
                <Button aria-describedby={id} className={classes.button} onClick={handleClick}>{finalnumber}</Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
                    <Typography className={classes.typography}>The content of the Popover.</Typography>
                </Popover>
                </React.Fragment>
        );
    }

}
