import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styledBy = (property) => (props) => {
    return props[property]*.4;
}


const styles = {
    options: {
        flexGrow: 1,
        fontSize: styledBy("fontsize"),
        display: "block"
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    number: {
        lineHeight: "1em",
        display: "block"
    }
}));

const StyledGrid = withStyles(styles)(({ classes, fontsize, ...other }) => (
    <Grid item xs={12} className={classes.options}  {...other}>
    </Grid>
));


export default function FullWidthGrid({ options, fontsize, children }) {
    const classes = useStyles();
    options = Array.from(options);

    return (
        <Grid container>
            <StyledGrid item xs={12} fontsize={fontsize}>
                {options.map((row) => { return row; })}
            </StyledGrid>
            <Grid item xs={12} className={classes.number}>
                {children}</Grid>
        </Grid>
    );
}