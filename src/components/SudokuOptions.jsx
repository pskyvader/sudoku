import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        fontSize: theme.spacing(1)
    },
}));

export default function FullWidthGrid({ options,children }) {
    const classes = useStyles();
    options = Array.from(options);

    return (
        <div>
            <div className={classes.root}>
            {options.map((row) => { return row; })}

            </div>
            <div>{children}</div>
            
        </div>
    );
}