
class Sudoku {
    matrix = [];
    constructor() {
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[i] = [];
            }
            this.matrix[i] = rows;
        }
    }
}