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


async function loadlanguage(lang,dictionaryList={}){
    console.log("finding",lang);
    if(!dictionaryList[lang]){
        console.log(lang, "not found",dictionaryList);
        import('./'+lang+'.json').then(({default:l})=>{
            dictionaryList[lang]=l;
            return dictionaryList;
        });
    }else{
        return dictionaryList;
    }
}

export const LanguageContext = createContext({
    userLanguage: defaultlanguage,
    dictionary: {}
});


export function LanguageProvider({ children }) {
    const [userLanguage, setUserLanguage] = useState(defaultlanguage);
    const emptyarray={}
    const [dictionaryList, setDictionaryList] = useState(emptyarray);

    console.log(dictionaryList);

    const selectedLanguage=dictionaryList && dictionaryList[userLanguage]?dictionaryList[userLanguage]:{};
    console.log("current",dictionaryList,userLanguage);

    const provider = {
        userLanguage,
        dictionary: selectedLanguage,
        userLanguageChange: async (selected) => {
            const newLanguage = languageOptions[selected] ? selected : defaultlanguage;
            await loadlanguage(newLanguage,dictionaryList).then((dl)=>{
                console.log("list",dl);
                setDictionaryList(dl);
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