import React from 'react';
import Header from './components/header';
import Home from './pages/Home';
import './App.css';

import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";


const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45, cacheboard);


function App() {
    return (
        <Header board={baseboard}>
            <Home board={baseboard} />
        </Header>
    );
}

export default App;
