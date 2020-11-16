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

    
    const [DifficultyCount, setDifficultyCount] = React.useState(board.difficultycount);


    React.useEffect(() => {
        if (cacheboard === null) {
            board.CreateBoard(45);
            LocalStorage.set("sudoku_board", board.CloneBoard());
        }
    }, [board, cacheboard]);




    const ResetBoard = (n, depth = 0, best_solution = null, t1 = null) => {
        if (n > 20) {
            const newboard = new SudokuResolver(n);
            board.RestoreBoard(newboard.CloneBoard());
            Save();
            LocalStorage.set("difficulty", n);
            setDifficulty(n);
            return;
        }
        if (depth === 0) {
            t1 = performance.now();
            board.CreateEmptyBoard();
            board.CreateBoard(n);
            LocalStorage.set("difficulty", n);
            setDifficulty(n);
            best_solution = {
                difficultycount: board.difficultycount,
                remaining: 81 - board.removed,
                board: board.CloneBoard(),
                worst: board.difficultycount
            }
        }

        if (best_solution.difficultycount < board.difficultycount) {
            best_solution.difficultycount = board.difficultycount;
            best_solution.remaining = 81 - board.removed;
            best_solution.board = board.CloneBoard();
        }

        if (best_solution.worst > board.difficultycount) {
            best_solution.worst = board.difficultycount;
        }

        var t2=performance.now();
        if (t2-t1<3000 && (best_solution.difficultycount)<30000) {
            board.RestoreBoard(board.fullboard);
            board.CleanBoard(n);
            setTimeout(() => {
                ResetBoard(n, depth + 1, best_solution, t1);
            }, 0);
        } else {
            board.RestoreBoard(best_solution.board);
            board.difficultycount=best_solution.difficultycount;
            setDifficultyCount(board.difficultycount);
            Save();
            setLoading(false);
            console.log("total",t2-t1);
            console.log(board.difficultycount, 81 - board.removed, best_solution,best_solution.difficultycount-best_solution.worst,depth);
        }
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
        setOptionsActive,
        setLoading,
        Loading,
        DifficultyCount
    };

    return (
        <BoardContext.Provider value={provider}>
            {children}
        </BoardContext.Provider>
    );
}

