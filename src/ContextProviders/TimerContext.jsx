import React, { createContext } from 'react';
import LocalStorage from "../logic/LocalStorage";

export const TimerContext = createContext({});
export default function TimerContextProvider({ children }) {
    const [seconds, SetSeconds] = React.useState(LocalStorage.get("seconds", 0));
    // const [RemainingSeconds, SetRemainingSeconds] = React.useState(LocalStorage.get("RemainingSeconds", 0));
    const [IsTimerActive, SetIsTimerActive] = React.useState(LocalStorage.get("IsTimerActive", true));

    React.useEffect(() => {
        let interval = null;
        if (IsTimerActive) {
            interval = setInterval(() => {
                LocalStorage.set("seconds", seconds + 1);
                SetSeconds(seconds + 1);
            }, 1000);
        } else if (!IsTimerActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [IsTimerActive, seconds]);

    // User has switched back to the tab
    const onFocus = () => {
        if(!IsTimerActive){
            ToggleTimer();
        }
    };

    // User has switched away from the tab (AKA tab is hidden)
    const onBlur = () => {
        if(IsTimerActive){
            ToggleTimer();
        }
    };

    React.useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    });

    const ToggleTimer = () => {
        LocalStorage.set("IsTimerActive", !IsTimerActive);
        SetIsTimerActive(!IsTimerActive);
    }

    const ResetTimer = () => {
        SetSeconds(0);
        LocalStorage.set("seconds", 0);
    }
    const Time=()=>{
        if(seconds<3600){
            return new Date(seconds * 1000).toISOString().substr(14, 5);
        }else{
            return new Date(seconds * 1000).toISOString().substr(11, 8);
        }
    }


    const provider = {
        Time,
        // RemainingSeconds,
        IsTimerActive,
        ToggleTimer,
        ResetTimer

    };

    return (
        <TimerContext.Provider value={provider}>
            {children}
        </TimerContext.Provider>
    );
}