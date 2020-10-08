import React, { createContext, useContext, useState } from 'react';

import LocalStorage from '../logic/LocalStorage';
// import en from './en.json';
// import es from './es.json';


export const languageOptions = {
    en: 'English',
    es: 'Español',
};

// create the language context with default selected language
const browserlanguage = (navigator.language || navigator.userLanguage).substring(0, 2);
const userLang = LocalStorage.get("rcml-lang", browserlanguage);
const defaultlanguage = languageOptions[userLang] ? userLang : 'en';

//let dictionaryList={};

async function loadlanguage(lang, dictlist = {}) {
    if (!dictlist[lang]) {
        return import('./' + lang + '.json').then(({ default: l }) => {
            dictlist[lang] = l;
            return dictlist;
        });
    } else {
        return dictlist;
    }
}

export const LanguageContext = createContext({
    userLanguage: defaultlanguage,
    dictionary: {}
});


let dictionaryList = {};
export function LanguageProvider({ children }) {
    const [userLanguage, setUserLanguage] = useState(defaultlanguage);
    const [dictionaryloaded, setdictionaryloaded] = useState(false);
    const selectedLanguage = dictionaryList[userLanguage] ? dictionaryList[userLanguage] : {};
    console.log("current", userLanguage, selectedLanguage);
    React.useEffect(() => {
        if (!dictionaryList[userLanguage]) {
            console.log("empty", userLanguage);
            loadlanguage(userLanguage, dictionaryList).then((dictlist) => {
                console.log("loaded");
                dictionaryList = dictlist;
                //setdictionaryloaded(!dictionaryloaded);
                setUserLanguage(userLanguage);
            });
        }
    });
    const provider = {
        userLanguage,
        dictionary: selectedLanguage,
        userLanguageChange: async (selected) => {
            const newLanguage = languageOptions[selected] ? selected : defaultlanguage;
            LocalStorage.set("rcml-lang", newLanguage);
            if (!dictionaryList[newLanguage]) {
                console.log("await");
                await loadlanguage(newLanguage, dictionaryList).then((dictlist) => {
                    dictionaryList = dictlist;
                    setUserLanguage(newLanguage);
                    //setdictionaryloaded(!dictionaryloaded);
                });
            } else {
                setUserLanguage(newLanguage);
            }
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
    return languageContext.dictionary[tid] || tid + "-TEXT";
}