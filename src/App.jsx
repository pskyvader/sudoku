// import React from 'react';
import Header from './components/header';
// import Home from './pages/Home';

import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";



import React, { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));
const renderLoader = () => null;


//const cacheboard = LocalStorage.get("sudoku_board", null);
const cacheboard=null;
const baseboard = new SudokuResolver(45, cacheboard);


function App() {
    return (
        <Header board={baseboard}>
            <Suspense fallback={renderLoader()}>
                <Home board={baseboard} />
            </Suspense>
        </Header>
    );
}

export default App;
