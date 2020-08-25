class SudokuValue {
    constructor(options, x, y, i, j, callback) {
        this.number = "";
        this.options = options;
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
        this.callback.Duplicates();
    }
}

export default SudokuValue;