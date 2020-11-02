import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Text from '../../languages/Language';
import { ThemeContext } from '../../ContextProviders/ThemeContext';

const useStyles = makeStyles((theme) => {
    return {
        darkmode: {
            color: theme.palette.info.contrastText,
            padding: theme.spacing(1)
        }
    }
});


const DarkModeButton = ({ mode = "button" }) => {
    const { DarkMode,SwitchDarkMode } = useContext(ThemeContext);
    const classes = useStyles();

    if (mode === "button") {
        return <Tooltip title={Text('darkmode')}>
            <IconButton className={classes.darkmode} onClick={() => SwitchDarkMode()}>
                {DarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    } else {
        return <ListItem button key={Text('darkmode')} onClick={() => SwitchDarkMode()}>
            <ListItemIcon>
                {DarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText primary={Text('darkmode')} />
        </ListItem>
    }

}

export default DarkModeButton;