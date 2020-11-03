import React, { createContext } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import indigo from '@material-ui/core/colors/indigo';
import Grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';


import LocalStorage from "../logic/LocalStorage";


export const ThemeContext = createContext({});

const DefaultColor = {
    primary: { light: indigo[600], dark: indigo[800] },
    secondary: { light: purple[600], dark: purple[900] },
};

export default function ThemeContextProvider({ children }) {
    const [DarkMode, SetDarkMode] = React.useState(LocalStorage.get("dark_mode", useMediaQuery('(prefers-color-scheme: dark)')));
    const [SelectedColor, SetSelectedColor] = React.useState(LocalStorage.get("selected_color", DefaultColor));

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        // main: DarkMode ? blueGrey[800] : indigo[800],
                        main: DarkMode ? SelectedColor['primary']['dark'] : SelectedColor['primary']['light'],
                    },
                    secondary: {
                        main: DarkMode ? SelectedColor['secondary']['dark'] : SelectedColor['secondary']['light'],
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
        [DarkMode, SelectedColor],
    );


    const SwitchDarkMode = () => {
        SetDarkMode(!DarkMode);
        LocalStorage.set("dark_mode", !DarkMode);
    }
    const SetColor = (color, primary = true) => {
        const newcolor = {};
        if (primary) {
            newcolor['primary'] = color;
            newcolor['secondary'] = SelectedColor['secondary'];
        } else {
            newcolor['secondary'] = color;
            newcolor['primary'] = SelectedColor['primary'];
        }
        SetSelectedColor(newcolor);
        LocalStorage.set("selected_color", newcolor);
    }

    const ResetColor=(primary = true)=>{
        const newcolor = {};
        if (primary) {
            newcolor['secondary'] = SelectedColor['secondary'];
            newcolor['primary'] = DefaultColor['primary'];
        } else {
            newcolor['primary'] = SelectedColor['primary'];
            newcolor['secondary'] = DefaultColor['secondary'];
        }
        SetSelectedColor(newcolor);
        LocalStorage.set("selected_color", newcolor);
    }


    const provider = {
        SetDarkMode,
        DarkMode,
        SwitchDarkMode,
        SetColor,
        ResetColor
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