import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    options: {
        flexGrow: 1,
        fontSize: "0.3em",
        display: "block",
        lineHeight: "1em",
    },
    number: {
        lineHeight: "1em",
        display: "block"
    }
}));

export default function FullWidthGrid({ options, children }) {
    const classes = useStyles();
    options = Array.from(options).join("");
    return (
        <Grid container>
            <Grid item xs={12} className={classes.options}>
                {options}
            </Grid>
            <Grid item xs={12} className={classes.number}>
                {children}</Grid>
        </Grid>
    );
}