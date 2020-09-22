import React, { createContext, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';


import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LocalStorage from '../logic/LocalStorage';
import en from './en.json';
import es from './es.json';



const useStyles = makeStyles((theme) => ({
    select: {
        color: theme.palette.primary.contrastText,
    },
    icon: {
        margin: theme.spacing(1),
      },
}));



export const dictionaryList = {
    en,
    es
};

export const languageOptions = {
    en: 'English',
    es: 'Español',
};

// create the language context with default selected language
export const LanguageContext = createContext({
    userLanguage: 'en',
    dictionary: dictionaryList.en
});

// get text according to id & current language
export function Text(tid) {
    const languageContext = useContext(LanguageContext);
    return languageContext.dictionary[tid] || tid;
};

export function LanguageProvider({ children }) {
    const [userLanguage, setUserLanguage] = useState('en');

    const provider = {
        userLanguage,
        dictionary: dictionaryList[userLanguage],
        userLanguageChange: selected => {
            const newLanguage = languageOptions[selected] ? selected : 'en'
            setUserLanguage(newLanguage);
            LocalStorage.set("rcml-lang", newLanguage);
        }
    };

    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    );
}



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
    const handleMenuItemClick = (e,id) => {
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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.select}>
                <LanguageIcon className={classes.icon}/>
                {/* {languageOptions[userLanguage]} */}
                {userLanguage}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {Object.entries(languageOptions).map(([id, name]) => (
                    <MenuItem key={id} selected={id === userLanguage} onClick={(event) => handleMenuItemClick(event,id)}>{name}</MenuItem>
                ))}
            </Menu>
        </div>
    );
};