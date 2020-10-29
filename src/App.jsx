import React, { lazy, Suspense } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';

import Header from './components/Header';
import SudokuResolver from './logic/SudokuResolver';
import LocalStorage from './logic/LocalStorage';
import Text, { LanguageProvider } from './languages/Language';


import ServiceWorkerProvider from './ServiceWorkerContext/ServiceWorkerContext';
// import * as serviceWorker from './serviceWorker';
import UseServiceWorker from './components/serviceworker/UseServiceWorker';



const Home = lazy(() => import('./pages/Home'));
// const UseServiceWorker = lazy(() => import('./components/serviceworker/UseServiceWorker'));

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LanguageProvider>
                <ServiceWorkerProvider>
                    <UseServiceWorker mode="snackbar" />
                    <Header board={baseboard}
                        Difficulty={Difficulty}
                        setDifficulty={setDifficulty}
                        DarkMode={DarkMode}
                        SetDarkMode={SetDarkMode}
                    >
                        <Suspense fallback={renderLoader()}>
                            <Home board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty} />
                        </Suspense>
                    </Header>
                </ServiceWorkerProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
