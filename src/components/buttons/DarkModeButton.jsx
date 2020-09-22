import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import LocalStorage from '../../logic/LocalStorage';

const useStyles = makeStyles((theme) => {
    return {
        darkmode: {
            color: theme.palette.info.contrastText,
            padding:theme.spacing(1,0)
        }
    }
});


const DarkModeButton = ({ DarkMode, SetDarkMode }) => {
    const classes = useStyles();
    const SwitchDarkMode = () => {
        LocalStorage.set("dark_mode", !DarkMode);
        SetDarkMode(!DarkMode);
    }
    return <IconButton className={classes.darkmode} onClick={() => SwitchDarkMode()}>
        {DarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
}

export default DarkModeButton;