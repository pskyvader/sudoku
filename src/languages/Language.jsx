import React, { createContext, useContext, useEffect, useState } from 'react';

import LocalStorage from '../logic/LocalStorage';
import en from './en.json';


export const dictionaryList = {
    en
};

export const languageOptions = {
    en: 'English',
};
// create the language context with default selected language
export const LanguageContext = createContext({
    userLanguage: 'en',
    dictionary: dictionaryList.en
});

// get text according to id & current language
export function Text({ tid }) {
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
        <select
            onChange={handleLanguageChange}
            value={userLanguage}
        >
            {Object.entries(languageOptions).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
            ))}
        </select>
    );
};