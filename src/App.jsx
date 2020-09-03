import React, { lazy, Suspense } from 'react';
import Header from './components/header';
// import Home from './pages/Home';
import './App.css';

import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";


const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);


const renderLoader = () => <p>...</p>;

//const Header = lazy(() => import('./components/header'));
const Home = lazy(() => import('./pages/Home'));




const App = () => (
    // <Suspense fallback={renderLoader()}>
        <Header board={baseboard}>
            <Suspense fallback={renderLoader()}>
                <Home board={baseboard} />
            </Suspense>
        </Header>
    // </Suspense>
)

// function App() {
//     return (
//         <Header board={baseboard}>
//             <Home board={baseboard} />
//         </Header>
//     );
// }

export default App;
