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
        this.SetValue(number);
        //this.options.clear();
        this.callback.Duplicates();
    }
    SetValue=(number)=>{
        if(this.SetFinalNumber!==undefined){
            this.SetFinalNumber(number);
        }else{
            this.number = number;
        }
    }
}

export default SudokuValue;