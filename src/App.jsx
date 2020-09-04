// import React from 'react';
// import Header from './components/header';
import Home from './pages/Home';

import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";


import React, { lazy, Suspense } from 'react';
const Header = lazy(() => import('./components/header'));
//const Home = lazy(() => import('./pages/Home'));


const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);


const renderLoader = () => null;


const useStyles = makeStyles((theme) => {

    return {
        root: {
            flexGrow: 1,
        }
    }

});


const App = () => {

    const classes = useStyles();

    return (<Suspense fallback={renderLoader()}>
        <div className={classes.root}>
            <Header board={baseboard}>
                {/* <Suspense fallback={renderLoader()}> */}
                {/* <Home board={baseboard} /> */}
                {/* </Suspense> */}
            </Header>


            <Container>
                <Home board={baseboard} />
            </Container>
        </div>

    </Suspense>)
}



// function App() {
//     return (
//         <Header board={baseboard}>
//             <Home board={baseboard} />
//         </Header>
//     );
// }

export default App;
