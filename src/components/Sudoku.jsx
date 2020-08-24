class SudokuValue {
    constructor(options, x, y, i, j, callbackmatrix, callback) {
        this.number = "";
        this.options = options;
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j;
        this.locked = false;
        this.callbackmatrix = callbackmatrix;
        this.callback = callback;
        this.error = false;
    }

    SetNumber = (number) => {
        this.SetFinalNumber(number);
        this.number = number;
        this.callback.CheckSquare();
        this.callback.CheckVertical(this.x, this.i);
        this.callback.CheckHorizontal(this.y, this.j);
    }
}


class SudokuNumber {
    constructor(x, y, callback) {
        this.x = x;
        this.y = y;
        this.callback = callback;
        this.submatrix = [];
        this.checklist = [];
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuValue(options, x, y, i, j, callback, this);
                this.checklist.push(rows[j]);
                this.callback.verticallines[x][i].push(rows[j]);
                this.callback.verticallines[y][j].push(rows[j]);
            }
            this.submatrix[i] = rows;
        }
    }

    CheckSquare = () => {
        this.MarkDuplicates(this.checklist);
    }
    CheckVertical = (x, i) => {
        const vertical = this.callback.verticallines[x][i];
        this.MarkDuplicates(vertical);
    }
    CheckHorizontal = (y, j) => {
        const horizontal = this.callback.horizontallines[y][j];
        this.MarkDuplicates(horizontal);
    }

    MarkDuplicates = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (this.duplicated(arr, element.number)) {
                element.SetError(true);
            } else if (element.error) {
                element.SetError(false);
            }
        }
    }

    duplicated = (arr, search) => {
        let count = arr.reduce(function (n, element) {
            return n + (search !== "" && element.number === search);
        }, 0);

        return (count > 1);
    }
}


class Sudoku {
    constructor() {
        this.matrix = [];
        this.emptyspaces = [];
        this.verticallines = [[[], [], []], [[], [], []], [[], [], []]]; //3x3 vertical lines
        this.horizontallines = [[[], [], []], [[], [], []], [[], [], []]]; //3x3 horizontal lines
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuNumber(i, j, this);
            }
            this.matrix[i] = rows;
        }
        this.EmptySpaces();
        console.log(this.verticallines, this.horizontallines);
    }



    EmptySpaces = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (this.matrix[i][j].submatrix[k][l].number === "") {
                            this.emptyspaces.push([i, j, k, l]);
                        }
                    }
                }
            }
        }
    }


    RandomNumbers = (quantity) => {
        if (quantity > 81 || quantity < 1) {
            throw console.error("quantity out of range");
        }
        for (let index = 0; index < quantity; index++) {
            const pos = Math.floor(Math.random() * (this.emptyspaces.length - 1));

            const current = this.emptyspaces[pos];


            let field = this.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.number = Math.floor(1 + Math.random() * 8);
            field.locked = true;
            this.emptyspaces.splice(pos, 1);
        }
    }


}

export default Sudoku;