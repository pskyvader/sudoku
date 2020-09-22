import React, { createContext, useContext, useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import LocalStorage from '../logic/LocalStorage';
import en from './en.json';
import es from './es.json';



const useStyles = makeStyles((theme) => ({
    select: {
        color: theme.palette.primary.contrastText,
        borderColor:"white"
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

    // set selected language by calling context method
    const handleLanguageChange = e => userLanguageChange(e.target.value);

    useEffect(() => {
        let defaultLanguage = LocalStorage.get("rcml-lang", null);
        if (!defaultLanguage) {
            defaultLanguage = window.navigator.language.substring(0, 2);
        }
        userLanguageChange(defaultLanguage);
    }, [userLanguageChange]);

    return (
        <Select variant='standard' value={userLanguage} onChange={handleLanguageChange} className={classes.select} >
            {Object.entries(languageOptions).map(([id, name]) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
        </Select>
    );
};