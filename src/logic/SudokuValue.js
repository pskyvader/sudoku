class SudokuValue {
    constructor(x, y, i, j, callback) {
        this.number = "";
        this.options = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j;
        this.locked = false;
        this.callback = callback;
        this.error = false;
    }

    SetNumber = (number) => {
        this.SetFinalNumber(number);
        this.number = number;
        //this.options.clear();
        this.callback.Duplicates();
    }
}

export default SudokuValue;