// import React from 'react';
// import Header from './components/header';
 import Home from './pages/Home';


import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";


import React, { lazy, Suspense } from 'react';
const Header = lazy(() => import('./components/header'));
//const Home = lazy(() => import('./pages/Home'));


const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);


const renderLoader = () => null;





const App = () => (
    <Suspense fallback={renderLoader()}>
        <Header board={baseboard}>
            {/* <Suspense fallback={renderLoader()}> */}
                <Home board={baseboard} />
            {/* </Suspense> */}
        </Header>
    </Suspense>
)

// function App() {
//     return (
//         <Header board={baseboard}>
//             <Home board={baseboard} />
//         </Header>
//     );
// }

export default App;
