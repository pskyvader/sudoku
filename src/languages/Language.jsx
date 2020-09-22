import React, { createContext, useContext, useState } from 'react';

import LocalStorage from '../logic/LocalStorage';
import en from './en.json';
import es from './es.json';



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


// get text according to id & current language
export default function Text(tid) {
    const languageContext = useContext(LanguageContext);
    return languageContext.dictionary[tid] || tid;
}