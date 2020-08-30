import React from 'react';
import Header from './components/header';
import Home from './pages/Home';
import './App.css';

import SudokuResolver from "./logic/SudokuResolver";
import LocalStorage from "./logic/LocalStorage";


const cacheboard = LocalStorage.get("sudoku_board", null);
const baseboard = new SudokuResolver(45);

function App() {
    const [board, setBoard] = React.useState(baseboard);

    return (
        <Header setBoard={setBoard}>
            <Home board={board}/>
        </Header>
    );
}

export default App;
