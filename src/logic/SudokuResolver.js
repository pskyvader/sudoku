import Sudoku from './Sudoku';

class SudokuResolver extends Sudoku {
    constructor(n) {
        super();
        this.CreateBoard(n);
    }


    RandomNumbers = (quantity) => {
        const t = this;
        if (quantity > 81 || quantity < 1) {
            throw console.error("quantity out of range");
        }
        for (let index = 0; index < quantity; index++) {
            const pos = Math.floor(Math.random() * (t.emptyspaces.length - 1));

            const current = t.emptyspaces[pos];


            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.number = Math.floor(1 + Math.random() * 8);
            t.CleanDuplicated();
            const duplicated = t.CheckDuplicates();
            if (duplicated > 0) {
                field.number = "";
                index--;
                continue;
            }

            field.locked = true;
            field.options.clear();
            t.emptyspaces.splice(pos, 1);
        }
    }

    CreateBoard = (n) => {
        const t = this;
        if (n > 81 || n < 1) {
            throw Error("number out of range");
        }
        t.RandomNumbers(30);

        try {
            t.Resolve();
        } catch (error) {
            console.log(error);
            t.CreateEmptyBoard();
            t.CreateBoard(n);
        }
    }

    Resolve = () => {
        const t = this;
        t.GetOptions();
        t.FillSingleOption();
    }

    GetOptions = () => {
        const t = this;
        for (let i = 0; i < t.list.length; i++) {
            const element = t.list[i];
            if (element.number === "") {
                t.CheckOptions(element);
            }
        }
    }
    FillSingleOption = () => {
        const t = this;
        for (let index = 0; index < t.list.length; index++) {
            const element = t.list[index];
            if(element.number===""){
                if (element.options.size === 1) {
                    element.number = element.options.values().next().value;
                    element.options.clear();
                }
            }
        }
    }

    CheckOptions = (number) => {
        const t = this;
        let list = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const { x, y, i, j } = number;
        t.DuplicatesList(t.matrix[x][y].checklist, list);
        t.DuplicatesList(t.verticallines[x][i], list);
        t.DuplicatesList(t.horizontallines[y][j], list);
        number.options = list;
    }

    DuplicatesList = (arr, list) => {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.number !== "") {
                list.delete(element.number);
            }
        }
        if (list.length === 0) {
            throw Error("Empty options");
        }
        return list;
    }

}

export default SudokuResolver;