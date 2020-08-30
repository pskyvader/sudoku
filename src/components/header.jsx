import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FaceIcon from '@material-ui/icons/Face';
import MoodBadIcon from '@material-ui/icons/MoodBad';



import SudokuResolver from "../logic/SudokuResolver";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const { board } = props;

    function ResetBoard(n) {
        const newboard = new SudokuResolver(n);
        board.RestoreBoard(newboard.CloneBoard());
    }
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}> Sudoku </Typography>
                    <Typography variant="h6" className={classes.menuButton}> New </Typography>

                    <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group" >
                        <Button onClick={() => ResetBoard(63)} disableElevation><EmojiEmotionsIcon /></Button>
                        <Button onClick={() => ResetBoard(45)}><InsertEmoticonIcon /></Button>
                        <Button onClick={() => ResetBoard(36)}><FaceIcon /></Button>
                        <Button onClick={() => ResetBoard(27)}><MoodBadIcon /></Button>
                    </ButtonGroup>

                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
