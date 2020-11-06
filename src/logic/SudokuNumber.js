import SudokuValue from './SudokuValue';

class SudokuNumber {
    constructor(x, y, callback) {
        this.x = x;
        this.y = y;
        this.callback = callback;
        this.submatrix = [];
        this.checklist = [];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuValue(x, y, i, j, this);
                this.checklist.push(rows[j]);
                this.callback.verticallines[x][i].push(rows[j]);
                this.callback.horizontallines[y][j].push(rows[j]);
                this.callback.list.push(rows[j]);
            }
            this.submatrix[i] = rows;
        }
    }
    Duplicates = () => {
        this.callback.CleanDuplicated();
        this.callback.CheckDuplicates();
        this.callback.CheckEmpty();
        this.callback.CheckSuccess();
    }
}

export default SudokuNumber;