import React, { createContext } from 'react';
import SudokuResolver from '../logic/SudokuResolver';
import LocalStorage from '../logic/LocalStorage';

export const BoardContext = createContext({});


function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export default function BoardContextProvider({ children }) {

    const cacheboard = LocalStorage.get("sudoku_board", null);
    const board = new SudokuResolver(45, cacheboard);
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", 45));
    const [OptionsActive, setOptionsActive] = React.useState(LocalStorage.get("options_active", false));
    const [Success, setSuccess] = React.useState(board.success);
    board.setSuccess = setSuccess;
    board.success = Success;



    const ResetBoard = (n) => {
        let newboard = new SudokuResolver(n);
        setDifficulty(n);
        LocalStorage.set("difficulty", n);
        const newmatrix = newboard.CloneBoard();
        board.RestoreBoard(newmatrix);
        LocalStorage.set("sudoku_board", newmatrix);
    }

    const Save = () => {
        LocalStorage.set("sudoku_board", board.CloneBoard());
    }
    const SaveBoard = debounce(Save, 3000);

    const provider = {
        board,
        Difficulty,
        setDifficulty,
        ResetBoard,
        SaveBoard,
        Success,
        setSuccess,
        OptionsActive,
        setOptionsActive
    };

    return (
        <BoardContext.Provider value={provider}>
            {children}
        </BoardContext.Provider>
    );
}

