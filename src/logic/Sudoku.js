import SudokuNumber from './SudokuNumber';



class Sudoku {
    constructor() {
        this.matrix = [];
        this.emptyspaces = [];
        this.verticallines = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ] ]; //3x3 vertical lines
        this.horizontallines = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ] ]; //3x3 horizontal lines
        this.list = []; //complete list
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuNumber(i, j, this);
            }
            this.matrix[i] = rows;
        }
        this.EmptySpaces();
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



    EmptySpaces = () => {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (this.matrix[x][y].submatrix[i][j].number === "") {
                            this.emptyspaces.push([x, y, i, j]);
                        }
                    }
                }
            }
        }
    }


    RandomNumbers = (quantity) => {
        const t=this;
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
            t.emptyspaces.splice(pos, 1);
        }
    }

    CreateBoard = (n) => {
        const t=this;
        if (n > 81 || n < 1) {
            throw console.error("number out of range");
        }
        t.RandomNumbers(30);
        t.Resolve();
    }

    Resolve = () => {

    }
}

export default Sudoku;