import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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