import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';


import LocalStorage from '../../logic/LocalStorage';
import Text, { LanguageContext, languageOptions } from '../../languages/Language';



const useStyles = makeStyles((theme) => ({
    select: {
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1, 0)
    },
    icon: {
        margin: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));



export default function LanguageSelector({ mode = "button" }) {
    const classes = useStyles();
    const { userLanguage, userLanguageChange } = useContext(LanguageContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // set selected language by calling context method
    const handleMenuItemClick = (e, id) => {
        userLanguageChange(id);
        setAnchorEl(null);
        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickList = () => {
        setOpen(!open);
    };


    useEffect(() => {
        let defaultLanguage = LocalStorage.get("rcml-lang", window.navigator.language.substring(0, 2));
        userLanguageChange(defaultLanguage);
    }, [userLanguageChange]);

    if (mode === "button") {
        return (
            <div>
                <Tooltip title={Text('language')}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.select}>
                        <LanguageIcon className={classes.icon} />
                        <Hidden smDown>
                            {languageOptions[userLanguage]}
                        </Hidden>
                        <Hidden mdUp>
                            {userLanguage}
                        </Hidden>
                    </Button>
                </Tooltip>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    {Object.entries(languageOptions).map(([id, name]) => (
                        <MenuItem key={id} selected={id === userLanguage} onClick={(event) => handleMenuItemClick(event, id)}>{name}</MenuItem>
                    ))}
                </Menu>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <ListItem button onClick={handleClickList}>
                    <ListItemIcon>
                        <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary={Text("language")} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {Object.entries(languageOptions).map(([id, name]) => (
                            <ListItem key={id} selected={id === userLanguage} button className={classes.nested} onClick={(event) => handleMenuItemClick(event, id)}>
                                <ListItemIcon>
                                    {id}
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </React.Fragment>

        )
    }

}