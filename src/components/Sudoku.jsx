

class SudokuNumber {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.submatrix = [];
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = { "number": 0, "options": options };
            }
            this.submatrix[i] = rows;
        }

    }
}


export default class Sudoku {
    constructor() {
        this.matrix = [];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuNumber(i,j);
            }
            this.matrix[i] = rows;
        }
    }
}