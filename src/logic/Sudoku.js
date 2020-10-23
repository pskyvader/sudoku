import SudokuNumber from './SudokuNumber';


class HelperSudoku{

    arrayEquals=(a, b)=> {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }

    CloneBoard = () => {
        const t = this;
        let clonelist = [];
        for (let i = 0; i < t.list.length; i++) {
            const e = t.list[i];
            clonelist.push({
                x: e.x,
                y: e.y,
                i: e.i,
                j: e.j,
                number: e.number,
                options: [...e.options],
                locked: e.locked,
                error: e.error
            });
        }
        return clonelist;
    }

    RestoreBoard = (clonelist) => {
        const t = this;
        for (let index = 0; index < clonelist.length; index++) {
            const e = clonelist[index];
            const element = t.matrix[e.x][e.y].submatrix[e.i][e.j];
            element.SetValue(e.number);
            element.SetValueOptions(new Set(e.options));
            element.locked = e.locked;
            element.SetValueError(e.error);
        }
        this.CheckSuccess();
    }
}


class Sudoku extends HelperSudoku{
    constructor() { //creates an empty sudoku board
        super();
        this.CreateEmptyBoard();
    }

    CreateEmptyBoard = () => {
        this.success = false;
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
    
    
    EmptySpaces = (x, y) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.emptyspaces.push([x, y, i, j]);
            }
        }
    }
    
    SetSuccessValue=(value)=>{
        if (this.setSuccess !== undefined) {
            this.setSuccess(value);
        }
        this.success = value;
    }

    CheckSuccess = () => {
        for (let i = 0; i < this.list.length; i++) {
            const element = this.list[i];
            if (element.number === "" || element.error) {
                this.SetSuccessValue(false);
                return;
            }
        }
        this.SetSuccessValue(true);
    }


    CleanDuplicated = () => {
        for (let i = 0; i < this.list.length; i++) {
            const element = this.list[i];
            element.SetValueError(false);
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
            if (this.isDuplicated(arr, element.number)) {
                element.SetValueError(true);
                count++;
            }
        }
        return count;
    }

    isDuplicated = (arr, search) => {
        let count = arr.reduce(function(n, element) {
            return n + (search !== "" && element.number === search);
        }, 0);
        return (count > 1);
    }

}

export default Sudoku;