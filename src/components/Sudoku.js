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
                rows[j] = new SudokuValue(options, x, y, i, j, this);
                this.checklist.push(rows[j]);
                this.callback.verticallines[x][i].push(rows[j]);
                this.callback.horizontallines[y][j].push(rows[j]);
                this.callback.list.push(rows[j]);
            }
            this.submatrix[i] = rows;
        }
    }
    Duplicates=()=>{
        this.callback.CleanDuplicated();
        this.callback.CheckDuplicates();
    }
}


class Sudoku {
    constructor() {
        this.matrix = [];
        this.emptyspaces = [];
        this.verticallines = [[[], [], []], [[], [], []], [[], [], []]]; //3x3 vertical lines
        this.horizontallines = [[[], [], []], [[], [], []], [[], [], []]]; //3x3 horizontal lines
        this.list=[]; //complete list
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
            if(element.SetError!==undefined){
                element.SetError(false);
            }else{
                element.error=false;
            }
        }
    }


    CheckDuplicates = () => {
        let count=0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const square=this.matrix[i][j].checklist;
                count+=this.MarkDuplicates(square);

                const vertical = this.verticallines[i][j];
                count+=this.MarkDuplicates(vertical);

                const horizontal = this.horizontallines[i][j];
                count+=this.MarkDuplicates(horizontal);
            }
        }
        return count;
    }



    MarkDuplicates = (arr) => {
        let count=0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (this.duplicated(arr, element.number)) {
                if(element.SetError!==undefined){
                    element.SetError(true);
                }else{
                    element.error=true;
                }
                count++;
            }
        }
        return count;
    }

    duplicated = (arr, search) => {
        let count = arr.reduce(function (n, element) {
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


    RandomNumbers = (quantity,number) => {
        if (quantity > 81 || quantity < 1) {
            throw console.error("quantity out of range");
        }
        for (let index = 0; index < quantity; index++) {
            const pos = Math.floor(Math.random() * (this.emptyspaces.length - 1));

            const current = this.emptyspaces[pos];


            let field = this.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];

            //field.number = Math.floor(1 + Math.random() * 8);
            field.number=number;

            this.CleanDuplicated();
            const duplicated=this.CheckDuplicates();
            if (duplicated>0){
                field.number="";
                index--;
                continue;
            }

            field.locked = true;
            this.emptyspaces.splice(pos, 1);
        }
    }

    CreateBoard=(n)=>{
        if (n > 81 || n < 1) {
            throw console.error("number out of range");
        }
        this.RandomNumbers(9,1);
        this.Resolve();
    }
    Resolve=()=>{

    }


}

export default Sudoku;