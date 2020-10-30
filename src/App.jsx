import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import SudokuResolver from './logic/SudokuResolver';
import LocalStorage from './logic/LocalStorage';
import Text, { LanguageProvider } from './languages/Language';
import ServiceWorkerProvider from './ContextProviders/ServiceWorkerContext';
import ThemeProvider from './ContextProviders/ThemeContext';


const Home = lazy(() => import('./pages/Home'));
const ServiceWorker = lazy(() => import('./components/buttons/ServiceWorker'));

const renderLoader = () => Text("loading");

const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);

function App() {
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", 45));
    return (
        <ThemeProvider>
            <LanguageProvider>
                <ServiceWorkerProvider>
                    <Header board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty} >
                        <Suspense fallback={renderLoader()}>
                            <Home board={baseboard} Difficulty={Difficulty} setDifficulty={setDifficulty} />
                        </Suspense>
                    </Header>
                    <Suspense fallback={renderLoader()}>
                        <ServiceWorker />
                    </Suspense>
                </ServiceWorkerProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
