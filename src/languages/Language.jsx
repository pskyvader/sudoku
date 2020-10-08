import React, { createContext, useContext, useState } from 'react';

import LocalStorage from '../logic/LocalStorage';
import en from './en.json';
import es from './es.json';


export const languageOptions = {
    en: 'English',
    es: 'Español',
};

// create the language context with default selected language

const userLang = navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2);
const defaultlanguage = languageOptions[userLang] ? userLang : 'en';


async function loadlanguage(lang, dictionaryList = {}) {
    if (!dictionaryList[lang]) {
        console.log(lang, "not found", dictionaryList);
        return import('./' + lang + '.json').then(({ default: l }) => {
            dictionaryList[lang] = l;
            return dictionaryList;
        });
    } else {
        console.log(lang, "found", dictionaryList);
        return dictionaryList;
    }
}

export const LanguageContext = createContext({
    userLanguage: defaultlanguage,
    dictionary: {}
});


export function LanguageProvider({ children }) {
    const [userLanguage, setUserLanguage] = useState("null");
    const emptyarray = {}
    const [dictionaryList, setDictionaryList] = useState(emptyarray);
    const selectedLanguage = dictionaryList[userLanguage] ? dictionaryList[userLanguage] : {};
    console.log("current", dictionaryList, userLanguage);
    React.useEffect(() => {
        if(dictionaryList==={}){
            console.log("EMPTY");
            loadlanguage(defaultlanguage, dictionaryList).then((dl) => {
                setDictionaryList(dl);
                setUserLanguage(defaultlanguage);
                LocalStorage.set("rcml-lang", defaultlanguage);
            });
        }
    })

    const provider = {
        userLanguage,
        dictionary: selectedLanguage,
        userLanguageChange: async (selected) => {
            const newLanguage = languageOptions[selected] ? selected : defaultlanguage;
            if (!dictionaryList[newLanguage]) {
                await loadlanguage(newLanguage, dictionaryList).then((dl) => {
                    setDictionaryList(dl);
                    setUserLanguage(newLanguage);
                    LocalStorage.set("rcml-lang", newLanguage);
                }
                );
            }else{
                setUserLanguage(newLanguage);
                LocalStorage.set("rcml-lang", newLanguage);
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