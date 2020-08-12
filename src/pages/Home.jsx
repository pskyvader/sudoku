import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: "100%",
        margin: theme.spacing(2),
    },
}));

function Box() {
    let box = "";
    for (let i = 0; i < 9; i++) {
        box += "a";
    }
    return box;
}




export default function SpacingGrid() {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.root} spacing={2}>
            {[0, 1, 2].map((valuex) => (
                <Grid key={valuex} item xs={4}>
                    {[0, 1, 2].map((valuey) => (
                        <Grid key={valuex + "," + valuey} item xs={12}>
                            asdf
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}