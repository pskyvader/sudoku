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

let dictionaryList = {};
async function loadlanguage(lang){
    console.log("finding",lang);
    if(!dictionaryList[lang]){
        import('./'+lang+'.json').then(({default:l})=>{
            dictionaryList[lang]=l;
        });
    }
}
loadlanguage(defaultlanguage);
export const LanguageContext = createContext({
    userLanguage: defaultlanguage,
    dictionary: dictionaryList[defaultlanguage]?dictionaryList[defaultlanguage]:{}
});


export function LanguageProvider({ children }) {
    const [userLanguage, setUserLanguage] = useState(defaultlanguage);
    const selectedLanguage=dictionaryList[userLanguage]?dictionaryList[userLanguage]:{};
    console.log(dictionaryList);

    const provider = {
        userLanguage,
        dictionary: selectedLanguage,
        userLanguageChange: async (selected) => {
            const newLanguage = languageOptions[selected] ? selected : defaultlanguage;
            await loadlanguage(newLanguage).then(()=>{
                setUserLanguage(newLanguage);
                LocalStorage.set("rcml-lang", newLanguage);
            }
            );
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