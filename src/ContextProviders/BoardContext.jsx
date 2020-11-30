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

const BoardContextProvider=({ children })=> {
    const default_difficulty = 2;
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", default_difficulty));
    const [OptionsActive, setOptionsActive] = React.useState(LocalStorage.get("options_active", false));

    const cacheboard = LocalStorage.get("sudoku_board", null);
    const board = new SudokuResolver(default_difficulty, cacheboard, true);
    const [Success, setSuccess] = React.useState(board.success);
    board.setSuccess = setSuccess;
    board.success = Success;



    React.useEffect(() => {
        if (cacheboard === null) {
            board.CreateBoard(default_difficulty);
            LocalStorage.set("sudoku_board", board.CloneBoard(), 365);
        }
    });




    const ResetBoard = (n) => {
        const newboard = new SudokuResolver(n);
        board.RestoreBoard(newboard.CloneBoard());
        Save();
        LocalStorage.set("difficulty", newboard.difficulty, 365);
        setDifficulty(newboard.difficulty);
        return;
    }

    const Save = () => {
        LocalStorage.set("sudoku_board", board.CloneBoard(), 365);
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
        setOptionsActive,
    };

    return (
        <BoardContext.Provider value={provider}>
            {children}
        </BoardContext.Provider>
    );
}


export default BoardContextProvider;