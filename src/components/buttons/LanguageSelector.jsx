import React, { useContext, useEffect, useState } from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';

import LocalStorage from '../../logic/LocalStorage';
import Text,{ LanguageContext, languageOptions} from '../../languages/Language';



const useStyles = makeStyles((theme) => ({
    select: {
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1, 0)
    },
    icon: {
        margin: theme.spacing(1),
    },
}));



export default function LanguageSelector() {
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
    }

    useEffect(() => {
        let defaultLanguage = LocalStorage.get("rcml-lang", null);
        if (!defaultLanguage) {
            defaultLanguage = window.navigator.language.substring(0, 2);
        }
        userLanguageChange(defaultLanguage);
    }, [userLanguageChange]);

    return (
        <div>
            <Tooltip title={Text('language')}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.select}>
                <LanguageIcon className={classes.icon} />
                <Hidden xsDown>
                    {languageOptions[userLanguage]}
                </Hidden>
                <Hidden smUp>
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
}