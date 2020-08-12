import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(2,0),
    },
}));

function SudokuBox() {
    const [height, setHeight] = React.useState(0);
    const measuredRef = React.useCallback(node => {
        if (node !== null) {
          setHeight(node.getBoundingClientRect().width);
        }
      }, []);



    const classes = useStyles();
    let box = "";
    for (let i = 0; i < 9; i++) {
        box += "a";
    }
    
    return <Paper className={classes.paper} >
        <Box height={Math.round(height)} bgcolor="grey.300"  width="100%" ref={measuredRef} display="inline-block">
        {box}
      </Box>
      
        </Paper>;
}




export default function SpacingGrid() {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.root} spacing={2}>
            {[0, 1, 2].map((valuex) => (
                <Grid key={valuex} item xs={4}>
                    {[0, 1, 2].map((valuey) => (
                        <Grid key={valuex + "," + valuey} item xs={12}>
                            <SudokuBox></SudokuBox>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}