import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { TimerContext } from '../../ContextProviders/TimerContext';

const useStyles = makeStyles((theme) => {
    return {
        darkmode: {
            color: theme.palette.info.contrastText,
            padding: theme.spacing(1)
        }
    }
});


const TimerButton = ({ mode = "button" }) => {
    const { Time } = useContext(TimerContext);
    const classes = useStyles();

    if (mode === "button") {
        return <Time/>;
    } else {
        // return <ListItem button key={Text('darkmode')} onClick={() => SwitchDarkMode()}>
        //     <ListItemIcon>
        //         {DarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        //     </ListItemIcon>
        //     <ListItemText primary={Text('darkmode')} />
        // </ListItem>
        return Time();
    }

}

export default TimerButton;