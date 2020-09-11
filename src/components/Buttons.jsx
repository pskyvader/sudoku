import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FaceIcon from '@material-ui/icons/Face';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import StarsIcon from '@material-ui/icons/Stars';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';



import SudokuResolver from "../logic/SudokuResolver";

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
        darkmode:{
            color:info.contrastText
        },
        buttonstar: {
            position: "absolute",
            bottom: theme.spacing(0.25),
            right: theme.spacing(0.25),
            fontSize: "0.75rem",
            borderRadius: "100%",
            backgroundColor: "white",
            color: warning.light
        },
        button1: buttoncolor(info, getContrastText),
        button2: buttoncolor(success, getContrastText),
        button3: buttoncolor(warning, getContrastText),
        button4: buttoncolor(error, getContrastText)
    }
});

const DifficultyButtons = (props) => {
    const { board, setDifficulty, Difficulty } = props;

    const classes = useStyles();

    function ResetBoard(n) {
        const newboard = new SudokuResolver(n);
        setDifficulty(n);
        board.RestoreBoard(newboard.CloneBoard());
    }


    return <ButtonGroup size="small">
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
}



const DarkModeButton = ({DarkMode,SetDarkMode}) => {
    const classes = useStyles();
    const SwitchDarkMode=()=>{
        SetDarkMode(!DarkMode);
    }
    return <IconButton className={classes.darkmode} onClick={() => SwitchDarkMode()}>
        {DarkMode?<Brightness7Icon />:<Brightness4Icon/>}
    </IconButton>
}

export { DifficultyButtons,DarkModeButton };