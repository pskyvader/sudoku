// import React from 'react';
import Header from './components/Header';
// import Home from './pages/Home';

import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';



import React, { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));
const renderLoader = () => null;


const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);


const theme = createMuiTheme({
    palette: {
        type: 'light',
    },
});


function App() {
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", 45));

    const Save = () => {
        LocalStorage.set("difficulty", Difficulty);
    }
    React.useEffect(() => {
        window.addEventListener("beforeunload", Save);
        return () => window.removeEventListener("beforeunload", Save);
    });


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty}>
                <Suspense fallback={renderLoader()}>
                    <Home board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty} />
                </Suspense>
            </Header>
        </ThemeProvider>
    );
}

export default App;
