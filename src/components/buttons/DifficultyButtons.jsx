import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from "@material-ui/core/Radio";

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FaceIcon from '@material-ui/icons/Face';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import StarsIcon from '@material-ui/icons/Stars';


import Text from '../../languages/Language';

import { BoardContext } from '../../ContextProviders/BoardContext';
import { TimerContext } from '../../ContextProviders/TimerContext';

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
    const { mode = "button" } = props;
    const { Difficulty, ResetBoard,setDifficulty } = useContext(BoardContext);
    const {ResetTimer } = useContext(TimerContext);

    const Reset = (number) => {
        // setDifficulty(0);
        ResetBoard(number);
        ResetTimer();
    }

    const classes = useStyles();

    const difficultylist = [
        { number: 1, text: Text('veryeasymode'), class: classes.button1, icon: EmojiEmotionsIcon },
        { number: 2, text: Text('easymode'), class: classes.button2, icon: InsertEmoticonIcon },
        { number: 3, text: Text('mediummode'), class: classes.button3, icon: FaceIcon },
        { number: 4, text: Text('hardmode'), class: classes.button4, icon: MoodBadIcon }
    ]


    // const textloading = Text('loading');
    // if (Loading && Difficulty <= 20) {
    //     return textloading
    // }
    if (mode === "button") {
        return <ButtonGroup size="small">
            {difficultylist.map((e) => (
                <Tooltip key={e.text} title={e.text}>
                    <Button className={e.class} onClick={() => Reset(e.number)}>
                        <e.icon />
                        {Difficulty === e.number ? <StarsIcon className={classes.buttonstar} /> : ""}
                    </Button>
                </Tooltip>
            ))}
        </ButtonGroup>
    } else {
        return <List>
            {difficultylist.map((e) => (
                <ListItem button key={e.text} onClick={() => Reset(e.number)} selected={Difficulty === e.number}>
                    <ListItemIcon> <e.icon /></ListItemIcon>
                    <ListItemText primary={e.text} />
                    <Radio
                        edge="end"
                        size="small"
                        disableRipple checked={Difficulty === e.number} />
                </ListItem>
            ))}
        </List>

    }

}


export default DifficultyButtons;