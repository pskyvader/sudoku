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
    const [Difficulty, setDifficulty] = React.useState(LocalStorage.get("difficulty", 45));
    const [Loading, setLoading] = React.useState(false);
    const [OptionsActive, setOptionsActive] = React.useState(LocalStorage.get("options_active", false));

    const cacheboard = LocalStorage.get("sudoku_board", null);
    const board = new SudokuResolver(45, cacheboard, true);
    const [Success, setSuccess] = React.useState(board.success);
    board.setSuccess = setSuccess;
    board.success = Success;


    React.useEffect(() => {
        if (cacheboard === null) {
            board.CreateBoard(45);
            //LocalStorage.set("sudoku_board", board.CloneBoard());
        }
    }, [Loading, board, cacheboard]);


    const newboardresolver = (n) => {
        let newboard = new SudokuResolver(n);
        for (let index = 0; index < 10; index++) {
            newboard = new SudokuResolver(n);
        }
        return newboard;
    }


    const ResetBoard = (n) => {
        setDifficulty(n);
        LocalStorage.set("difficulty", n);
        const newboard = newboardresolver(n)
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
        ResetBoard,
        SaveBoard,
        Success,
        setSuccess,
        OptionsActive,
        setOptionsActive,
        setLoading,
        Loading
    };

    return (
        <BoardContext.Provider value={provider}>
            {children}
        </BoardContext.Provider>
    );
}

