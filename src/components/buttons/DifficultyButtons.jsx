import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FaceIcon from '@material-ui/icons/Face';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import StarsIcon from '@material-ui/icons/Stars';

import SudokuResolver from "../../logic/SudokuResolver";
import LocalStorage from "../../logic/LocalStorage";
import Text from '../../languages/Language';

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
        LocalStorage.set("difficulty", n);
        const newmatrix=newboard.CloneBoard();
        board.RestoreBoard(newmatrix);
        LocalStorage.set("sudoku_board", newmatrix);
    }


    return <ButtonGroup size="small">
        <Tooltip title={Text('veryeasymode')}>
            <Button className={classes.button1} onClick={() => ResetBoard(63)}>
                <EmojiEmotionsIcon />
                {Difficulty === 63 ? <StarsIcon className={classes.buttonstar} /> : ""}
            </Button>
        </Tooltip>
        <Tooltip title={Text('easymode')}>
            <Button className={classes.button2} onClick={() => ResetBoard(45)}>
                <InsertEmoticonIcon />
                {Difficulty === 45 ? <StarsIcon className={classes.buttonstar} /> : ""}
            </Button>
        </Tooltip>
        <Tooltip title={Text('mediummode')}>
            <Button className={classes.button3} onClick={() => ResetBoard(36)}>
                <FaceIcon />
                {Difficulty === 36 ? <StarsIcon className={classes.buttonstar} /> : ""}
            </Button>
        </Tooltip>
        <Tooltip title={Text('hardmode')}>
            <Button className={classes.button4} onClick={() => ResetBoard(27)}>
                <MoodBadIcon />
                {Difficulty === 27 ? <StarsIcon className={classes.buttonstar} /> : ""}
            </Button>
        </Tooltip>
    </ButtonGroup>
}


export default DifficultyButtons;