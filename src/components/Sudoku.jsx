class SudokuValue{
    constructor(options,x,y,i,j,callbackmatrix,callback) {
        this.number="";
        this.options=options;
        this.x=x;
        this.y=y;
        this.i=i;
        this.j=j;
        this.locked=false;
        this.callbackmatrix=callbackmatrix;
        this.callback=callback;
        this.error=false;
    }

    SetNumber=(number)=>{
        this.SetFinalNumber(number);
        this.callback.CheckNumbers();
        this.callbackmatrix.SetError();
    }
}


class SudokuNumber {
    constructor(x, y,callback) {
        this.x=x;
        this.y=y;
        this.submatrix = [];
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuValue(options,x,y,i, j,callback,this);
            }
            this.submatrix[i] = rows;
        }
    }

    CheckNumbers(){
        let repeated=[];
        for (let i = 0; i < this.submatrix.length; i++) {
            const row = this.submatrix[i];
            for (let j = 0; j < row.length; j++) {
                const element = row[j];
                if(repeated.find(e => e ===element.number)){
                    element.error=true;
                }
                repeated.push(element.number);                
            }
            
        }
    }
}


class Sudoku {
    constructor() {
        this.matrix = [];
        this.emptyspaces=[];
        for (let i = 0; i < 3; i++) {
            let rows = [];
            for (let j = 0; j < 3; j++) {
                rows[j] = new SudokuNumber(i, j,this);
            }
            this.matrix[i] = rows;
        }
        this.EmptySpaces();
    }

    SetError=()=>{
        console.log('uwu');
        this.matrix[0][0].submatrix[0][0].number="E";
        this.matrix[0][0].submatrix[0][0].SetFinalNumber("E");
    }

    EmptySpaces=()=>{
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (this.matrix[i][j].submatrix[k][l].number===""){
                            this.emptyspaces.push([i,j,k,l]);
                        }
                    }
                }
            }
        }
    }


    RandomNumbers=(quantity)=>{
        if(quantity>81 || quantity<1){
            throw console.error("quantity out of range");
        }
        for (let index = 0; index < quantity; index++) {
            const pos=Math.floor(Math.random()*(this.emptyspaces.length-1));

            const current=this.emptyspaces[pos];


            let field=this.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.number=Math.floor(1+Math.random()*8);
            field.locked=true;
            this.emptyspaces.splice(pos, 1); 
        }
    }


}

export default Sudoku;