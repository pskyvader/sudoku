import React, { lazy, Suspense } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import purple from '@material-ui/core/colors/purple';

import Header from './components/Header';
import SudokuResolver from './logic/SudokuResolver';
import LocalStorage from './logic/LocalStorage';
import UseServiceWorker from './components/UseServiceWorker';
import Text, { LanguageProvider } from './languages/Language';

const Home = lazy(() => import('./pages/Home'));

const renderLoader = () => Text("loading");

const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);

function App() {
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", 45));
    const [DarkMode, SetDarkMode] = React.useState(LocalStorage.get("dark_mode", useMediaQuery('(prefers-color-scheme: dark)')));
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        main: DarkMode ? blueGrey[800] : indigo[800],
                    },
                    secondary: {
                        main: purple[500]
                    },
                    type: DarkMode ? 'dark' : 'light',
                    selected: {
                        color: "red"
                    }
                },
                components: {
                    MuiListItem: {
                      styleOverrides:{
                          
                        button: {
                            backgroundColor: "red"
                          },
                          '&$selected': {
                            backgroundColor: "blue",
                            '&$focusVisible': {
                              backgroundColor: "green"
                            }
                          },
                      }
                    },
                  },
            }),
        [DarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LanguageProvider>
                <UseServiceWorker />
                <Header board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty} DarkMode={DarkMode} SetDarkMode={SetDarkMode}>
                    <Suspense fallback={renderLoader()}>
                        <Home board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty} />
                    </Suspense>
                </Header>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
