

class SudokuNumber {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.submatrix = [];
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = { "number": 0, "options": options, i: i, j: j, x: x, y: y };
            }
            this.submatrix[i] = rows;
        }

    }
}


class Sudoku {
    constructor() {
        this.matrix = [];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuNumber(i, j);
            }
            this.matrix[i] = rows;
        }
    }


    RandomNumbers=(quantity)=>{
        if(quantity>81 || quantity<1){
            throw console.error("quantity out of range");
        }

        for (let index = 0; index < quantity; index++) {
            const x=Math.floor(Math.random()*2);
            const y=Math.floor(Math.random()*2);
            const i=Math.floor(Math.random()*2);
            const j=Math.floor(Math.random()*2);
            

            let field=this.matrix[x][y].submatrix[i][j];
            if(field.number!==0){
                index--;
                continue;
            }
            field.number=Math.floor(1+Math.random()*8);
        }

    }


}

export default Sudoku;