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
        margin: theme.spacing(2, 0),
    },
}));



function SudokuBox() {
    const classes = useStyles();
    const canvas = React.useRef(null);

    const [height, setHeight] = React.useState(10);
    const BoxHeight=()=>{
        setHeight(canvas.current.clientWidth);
    }

    React.useEffect(() => {
        window.addEventListener("resize", BoxHeight);
        window.addEventListener("load", BoxHeight);
        return () => window.removeEventListener("resize", BoxHeight);
    });
    



    let box = "";
    for (let i = 0; i < 9; i++) {
        box += "a";
    }

    return <Paper className={classes.paper}>
        <Box height={height} bgcolor="grey.300" width="100%" ref={canvas} display="inline-block">
            {box} {height}
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