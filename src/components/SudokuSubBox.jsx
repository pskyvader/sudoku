import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 0),
    }
}));



export default function SudokuBox({ board, x, y }) {
    let box = board.matrix[x][y].submatrix;

    let subbox = "";
    for (let i = 0; i < box.length; i++) {
        const row = box[i];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            subbox += element['number'];
        }

    }
    return <Box >
        <Grid container justify="center" spacing={2}>
            {box.map((row, valuex) => {

                return <Grid key={x + "," + y + "-" + valuex} item xs={4}>
                    {row.map((column,valuey) => (
                        <Grid key={x + "," + y + "-" + valuex + "," + valuey} item xs={12}>
                            {column.number}
                        </Grid>
                    ))}
                </Grid>
            }
            )}
        </Grid>
    </Box>

}
