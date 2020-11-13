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
    const [Loading, setLoading] = React.useState(LocalStorage.get("loading", true));
    const [OptionsActive, setOptionsActive] = React.useState(LocalStorage.get("options_active", false));

    const cacheboard = LocalStorage.get("sudoku_board", null);
    const board=new SudokuResolver(45, cacheboard,true);
    const [Success, setSuccess] = React.useState(board.success);
    board.setSuccess = setSuccess;
    board.success = Success;

    React.useEffect(()=>{
        if(cacheboard===null){
            board.CreateBoard(45);
            //LocalStorage.set("sudoku_board", board.CloneBoard());
        }
        if(Loading){
            setLoading(false);
        }
    },[Loading,board,cacheboard]);



    const ResetBoard = (n) => {
        setLoading(true);
        let newboard = new SudokuResolver(n);
        setDifficulty(n);
        LocalStorage.set("difficulty", n);
        const newmatrix = newboard.CloneBoard();
        board.RestoreBoard(newmatrix);
        LocalStorage.set("sudoku_board", newmatrix);
        setLoading(false);
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
        Loading
    };

    return (
        <BoardContext.Provider value={provider}>
            {children}
        </BoardContext.Provider>
    );
}

