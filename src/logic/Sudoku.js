import SudokuNumber from './SudokuNumber';



class Sudoku {
    constructor() { //creates an empty sudoku board
        this.matrix = [];
        this.emptyspaces = [];
        this.verticallines = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ] ]; //3x3 vertical lines
        this.horizontallines = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ] ]; //3x3 horizontal lines
        this.list = []; //complete list
        for (let x = 0; x < 3; x++) {
            let rows = [];
            for (let y = 0; y < 3; y++) {
                rows[y] = new SudokuNumber(x, y, this);
                this.EmptySpaces(x, y);
            }
            this.matrix[x] = rows;
        }
    }


    CleanDuplicated = () => {
        for (let i = 0; i < this.list.length; i++) {
            const element = this.list[i];
            if (element.SetError !== undefined) {
                element.SetError(false);
            } else {
                element.error = false;
            }
        }
    }


    CheckDuplicates = () => {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const square = this.matrix[i][j].checklist;
                count += this.MarkDuplicates(square);

                const vertical = this.verticallines[i][j];
                count += this.MarkDuplicates(vertical);

                const horizontal = this.horizontallines[i][j];
                count += this.MarkDuplicates(horizontal);
            }
        }
        return count;
    }



    MarkDuplicates = (arr) => {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (this.duplicated(arr, element.number)) {
                if (element.SetError !== undefined) {
                    element.SetError(true);
                } else {
                    element.error = true;
                }
                count++;
            }
        }
        return count;
    }

    duplicated = (arr, search) => {
        let count = arr.reduce(function(n, element) {
            return n + (search !== "" && element.number === search);
        }, 0);
        return (count > 1);
    }

    EmptySpaces = (x, y) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.emptyspaces.push([x, y, i, j]);
            }
        }
    }
}

export default Sudoku;