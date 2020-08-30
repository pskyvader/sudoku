import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
// import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import MenuIcon from '@material-ui/icons/Menu';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FaceIcon from '@material-ui/icons/Face';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import StarsIcon from '@material-ui/icons/Stars';


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
    buttonstar:{
        position:"absolute",
        bottom:1,
        right:1,
        fontSize:"0.75rem"
    },
    button1: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.getContrastText(theme.palette.info.main),
        '&:hover': {
            backgroundColor: theme.palette.info.dark,
            color: theme.palette.getContrastText(theme.palette.info.dark),
        },
    },
    button2: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.getContrastText(theme.palette.success.main),
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
            color: theme.palette.getContrastText(theme.palette.success.dark),
        },
    },
    button3: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.getContrastText(theme.palette.warning.main),
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
            color: theme.palette.getContrastText(theme.palette.warning.dark),
        },
    },
    button4: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.getContrastText(theme.palette.error.main),
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.getContrastText(theme.palette.error.dark),
        },
    }
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

                    <ButtonGroup variant="contained" >
                        <Button classes={{ root: classes.button1 }} onClick={() => ResetBoard(63)}><EmojiEmotionsIcon /> <StarsIcon className={classes.buttonstar}/></Button>
                        <Button className={classes.button2} onClick={() => ResetBoard(45)}><InsertEmoticonIcon /></Button>
                        <Button className={classes.button3} onClick={() => ResetBoard(36)}><FaceIcon /></Button>
                        <Button className={classes.button4} onClick={() => ResetBoard(27)}><MoodBadIcon /></Button>
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
