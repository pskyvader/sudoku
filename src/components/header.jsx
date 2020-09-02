import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FaceIcon from '@material-ui/icons/Face';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import StarsIcon from '@material-ui/icons/Stars';


// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


import SudokuResolver from "../logic/SudokuResolver";
import LocalStorage from "../logic/LocalStorage";


const buttoncolor = (pallete, getContrastText) => {
    return {
        backgroundColor: pallete.main,
        color: getContrastText(pallete.main),
        border: "none",
        '&:hover': {
            backgroundColor: pallete.dark,
            color: getContrastText(pallete.dark),
            border: "none",
        },
    }
}


const useStyles = makeStyles((theme) => {
    const { info, success, warning, error, getContrastText } = theme.palette;

    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        buttonstar: {
            position: "absolute",
            bottom: theme.spacing(0.25),
            right: theme.spacing(0.25),
            fontSize: "0.75rem",
            borderRadius:"100%",
            backgroundColor:"white",
            color:warning.light
        },
        button1: buttoncolor(info, getContrastText),
        button2: buttoncolor(success, getContrastText),
        button3: buttoncolor(warning, getContrastText),
        button4: buttoncolor(error, getContrastText)
    }

}


);

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", 45));
    const { board } = props;

    function ResetBoard(n) {
        const newboard = new SudokuResolver(n);
        setDifficulty(n);
        board.RestoreBoard(newboard.CloneBoard());
    }
    const Save = () => {
        LocalStorage.set("difficulty", Difficulty);
    }
    React.useEffect(() => {
        window.addEventListener("beforeunload", Save);
        return () => window.removeEventListener("beforeunload", Save);
    });
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}> Sudoku </Typography>

                    <ButtonGroup size="small">
                        <Button className={classes.button1} onClick={() => ResetBoard(63)}>
                            <EmojiEmotionsIcon />
                            {Difficulty === 63 ? <StarsIcon className={classes.buttonstar} /> : ""}
                        </Button>
                        <Button className={classes.button2} onClick={() => ResetBoard(45)}>
                            <InsertEmoticonIcon />
                            {Difficulty === 45 ? <StarsIcon className={classes.buttonstar} /> : ""}
                        </Button>
                        <Button className={classes.button3} onClick={() => ResetBoard(36)}>
                            <FaceIcon />
                            {Difficulty === 36 ? <StarsIcon className={classes.buttonstar} /> : ""}
                        </Button>
                        <Button className={classes.button4} onClick={() => ResetBoard(27)}>
                            <MoodBadIcon />
                            {Difficulty === 27 ? <StarsIcon className={classes.buttonstar} /> : ""}
                        </Button>
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
