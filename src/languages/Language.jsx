import React, { createContext, useContext, useState } from 'react';
import LocalStorage from '../logic/LocalStorage';

export const languageOptions = {
    en: 'English',
    es: 'Español',
};
let dictionaryList = {};

// create the language context with default selected language
const browserlanguage = (navigator.language || navigator.userLanguage).substring(0, 2);
const userLang = LocalStorage.get("rcml-lang", browserlanguage);
const defaultlanguage = languageOptions[userLang] ? userLang : 'en';

async function loadlanguage(lang) {
    if (!dictionaryList[lang]) {
        return import('./' + lang + '.json').then(({ default: l }) => {
            dictionaryList[lang] = l;
        });
    }
}

export const LanguageContext = createContext({
    userLanguage: defaultlanguage,
    dictionary: {}
});


export function LanguageProvider({ children }) {
    const [userLanguage, setUserLanguage] = useState(defaultlanguage);
    const [dictionaryloaded, setdictionaryloaded] = useState(false);
    const selectedLanguage = dictionaryList[userLanguage] ? dictionaryList[userLanguage] : {};

    React.useEffect(() => {
        if (!dictionaryList[userLanguage]) {
            loadlanguage(userLanguage).then(() => {
                setdictionaryloaded(!dictionaryloaded);
            });
        }
    });

    const ChangeLanguage = async (selected) => {
        const newLanguage = languageOptions[selected] ? selected : defaultlanguage;
        LocalStorage.set("rcml-lang", newLanguage,365);
        if (!dictionaryList[newLanguage]) {
            await loadlanguage(newLanguage).then(() => {
                setUserLanguage(newLanguage);
            });
        } else {
            setUserLanguage(newLanguage);
        }
    }

    const provider = {
        userLanguage,
        dictionary: selectedLanguage,
        userLanguageChange: ChangeLanguage
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
    return languageContext.dictionary[tid] || tid + "-TEXT";
}