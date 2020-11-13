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
            LocalStorage.set("sudoku_board", board.CloneBoard());
        }
    }, [board, cacheboard]);




    const ResetBoard = (n, deep = 0, best_solution = null) => {
        if (deep === 0) {
            board.CreateEmptyBoard();
            board.CreateBoard(n);
        }
        if (n > 20) {
            LocalStorage.set("difficulty", n);
            setDifficulty(n);
            Save();
            setLoading(false);
        } else {
            if (best_solution === null || best_solution.difficultycount < board.difficultycount) {
                best_solution = {
                    difficultycount: board.difficultycount,
                    board: board.CloneBoard()
                }
            }

            if (deep < 10) {
                board.RestoreBoard(board.fullboard);
                board.CleanBoard(n);
                setTimeout(() => {
                    ResetBoard(n, deep + 1, best_solution);
                }, 0);
            } else {
                LocalStorage.set("difficulty", n);
                setDifficulty(n);
                Save();
                setLoading(false);
            }
        }
        console.log(board.difficultycount,81-board.removed, "best", best_solution);
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

