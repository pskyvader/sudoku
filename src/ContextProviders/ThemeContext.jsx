import React, { createContext } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';


import LocalStorage from "../logic/LocalStorage";


export const ThemeContext = createContext({});

export default function ThemeContextProvider({ children }) {
    const [DarkMode, SetDarkMode] = React.useState(LocalStorage.get("dark_mode", useMediaQuery('(prefers-color-scheme: dark)')));
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        // main: DarkMode ? blueGrey[800] : indigo[800],
                        main: DarkMode ?  indigo[600]: indigo[800],
                    },
                    secondary: {
                        main: purple[500]
                    },
                    type: DarkMode ? 'dark' : 'light',
                },
                components: {
                    MuiListItem: {
                        styleOverrides: {
                            button: {
                                '&:hover': {
                                    backgroundColor: DarkMode ? Grey[700] : Grey[200]
                                },
                                '&$selected': {
                                    backgroundColor: DarkMode ? Grey[600] : Grey[300],
                                    '&:hover': {
                                        backgroundColor: DarkMode ? Grey[500] : Grey[400]
                                    },
                                },
                            },
                        }
                    },
                },
            }),
        [DarkMode],
    );

    
    const SwitchDarkMode = () => {
        SetDarkMode(!DarkMode);
        LocalStorage.set("dark_mode", !DarkMode);
    }


    const provider = {
        SetDarkMode,
        DarkMode,
        SwitchDarkMode
    };

    return (
        <ThemeContext.Provider value={provider}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}