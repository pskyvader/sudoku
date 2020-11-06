import Sudoku from './Sudoku';

class SudokuResolver extends Sudoku {
    constructor(n, cacheboard = null) {
        super();
        this.errorcount = 0;
        if (cacheboard === null) {
            var t0 = performance.now();
            this.CreateBoard(n);
            var t1 = performance.now();
            console.log("CreateSudoku took " + (t1 - t0) + " milliseconds.");
            //console.log(t1 - t0);
        } else {
            this.RestoreBoard(cacheboard);
        }
    }
    RandomNumbers = (number) => {
        const t = this;
        if (number > 81 || number < 1) {
            throw Error("number out of range");
        }
        const emptyspaces = [...t.emptyspaces];
        for (let index = 0; index < number; index++) {
            const pos = Math.floor(Math.random() * (emptyspaces.length - 1));
            const current = emptyspaces[pos];

            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.SetValue(Math.floor(1 + Math.random() * 8));
            t.CleanDuplicated();
            const duplicated = t.CheckDuplicates();
            if (duplicated > 0) {
                field.number = "";
                index--;
                continue;
            }
            field.options.clear();
            emptyspaces.splice(pos, 1);
        }
    }

    CreateBoard = (n, deep = 0) => {
        const t = this;
        if (n > 81 || n < 1) {
            throw Error("number out of range");
        }
        t.RandomNumbers(27);

        try {
            t.Resolve();
        } catch (error) {
            t.errorcount += 1;
            //console.log(error.message, t.errorcount, "deep:", deep);
            t.CreateEmptyBoard();
            t.CreateBoard(n, deep + 1);
        }
        if (deep === 0) {
            t.CleanBoard(n);
        }
    }
    CleanBoard = (n) => {
        const t = this;
        if (n > 81 || n < 1) {
            throw Error("number out of range");
        }
        const emptyspaces = [...t.emptyspaces];
        this.removed = 0;

        while (this.removed < 81 - n && emptyspaces.length > 0) {
            const pos = Math.floor(Math.random() * (emptyspaces.length - 1));
            const current = emptyspaces[pos];
            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            const tmp = field.number;
            field.number = "";
            const clonelist = t.CloneBoard();
            const solutions = t.ResolveUnique();
            t.RestoreBoard(clonelist);
            if (solutions === 0) {
                console.log(solutions, "solutions");
            }
            if (solutions === 1) {
                this.removed++;
            } else {
                field.number = tmp;
            }
            emptyspaces.splice(pos, 1);
        }
        for (let index = 0; index < t.emptyspaces.length; index++) {
            const current = t.emptyspaces[index];
            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            if (field.number !== "") {
                field.locked = true;
            }
        }
    }


    ResolveUnique = (deep = 0, solutions = 0) => {
        if (solutions > 1) {
            return solutions;
        }
        const t = this;
        let changes = 1;
        while (changes > 0) {
            changes = 0;
            try {
                changes += t.FillSingleOption(); // check if there are any field with only one option and use it
            } catch (error) { //if 0 options, no solution
                return 0;
            }
            if (changes === 0) {
                changes += t.FillByLine(); // check if there are any line or square with a unique number in its options and use it
            }
        }

        if (!t.CheckCompleteBoard()) {
            const clonelist = t.CloneBoard();
            const randomtry = t.Random();
            let randomoptions = [...randomtry.options];
            randomtry.number = randomoptions[0];
            let last = 0;
            let i = 0;
            //let solutions = 0;
            while (randomtry.number !== last && randomtry.number !== undefined) {
                last = randomtry.number;
                t.RestoreBoard(clonelist);
                randomtry.number = last;
                try {
                    let sol = solutions;
                    solutions = t.ResolveUnique(deep + 1, solutions);
                    if (solutions > sol) {
                        solutions++;
                    }
                } catch (error) {
                    //console.log(error.message, t.errorcount, "Submatrix", "deep:", deep);
                } finally {
                    if (!t.arrayEquals(randomoptions, [...randomtry.options])) {
                        randomoptions = [...randomtry.options];
                        i = 0;
                    } else {
                        i++;
                    }
                    randomtry.number = randomoptions[i];
                }
            }
            randomtry.number = "";
            if (solutions > 1) {
                return solutions;
            }

            if (!t.CheckCompleteBoard()) {
                return t.ResolveUnique(deep + 1, solutions);
            } else {
                solutions++;
                return solutions;
            }
        } else {
            solutions++;
            return solutions;
        }
    }


    Resolve = (deep = 0) => {
        const t = this;
        let changes = 1;
        while (changes > 0) {
            changes = 0;
            changes += t.FillSingleOption(); // check if there are any field with only one option and use it
            if (changes === 0) {
                changes += t.FillByLine(); // check if there are any line or square with a unique number in its options and use it
            }
        }

        if (!t.CheckCompleteBoard()) {
            const clonelist = t.CloneBoard();
            const randomtry = t.Random();
            let randomoptions = [...randomtry.options];
            randomtry.number = randomoptions[0];
            let last = 0;
            let i = 0;
            while (!t.CheckCompleteBoard() && randomtry.number !== last && randomtry.number !== undefined) {
                last = randomtry.number;
                t.RestoreBoard(clonelist);
                randomtry.number = last;
                try {
                    t.Resolve(deep + 1);
                } catch (error) {
                    //console.log(error.message, t.errorcount, "Submatrix", "deep:", deep);
                } finally {
                    if (!t.arrayEquals(randomoptions, [...randomtry.options])) {
                        randomoptions = [...randomtry.options];
                        i = 0;
                    } else {
                        i++;
                    }
                    randomtry.number = randomoptions[i];
                }
            }
            randomtry.number = "";


            if (!t.CheckCompleteBoard()) {
                t.Resolve();
            } else {
                randomtry.SetValue(randomtry.number);
                randomtry.options.clear();
            }
        }
    }


    CheckCompleteBoard = () => {
        const t = this;
        for (let i = 0; i < t.list.length; i++) {
            const element = t.list[i];
            if (element.number === "") {
                return false;
            }
        }
        return true;
    }


    Random = (min = 3) => { //returns a cell with less options than MIN
        const t = this;
        for (let i = 0; i < t.list.length; i++) {
            const element = t.list[i];
            if (element.number === "") {
                element.SetValueOptions(t.CheckOptions(element));
                if (element.options.size < min) {
                    return element;
                }
            }
        }
        return t.Random(min + 1);
    }

    // check if there are any field with only one option and use it
    FillSingleOption = () => {
        const t = this;
        let changes = 0;
        for (let index = 0; index < t.list.length; index++) {
            const element = t.list[index];
            if (element.number === "") {
                element.SetValueOptions(t.CheckOptions(element));
                if (element.options.size === 1) {
                    element.SetValue(element.options.values().next().value);
                    element.options.clear();
                    changes++;
                }
            }
        }
        return changes;
    }

    // check if there are any line or square with a unique number in its options and use it
    FillByLine = () => {
        const t = this;
        let changes = 0;
        for (let index = 0; index < t.list.length; index++) {
            const element = t.list[index];
            if (element.number === "") {
                if (t.CheckUnique(element)) {
                    element.options.clear();
                    changes++;
                }
            }
        }
        return changes;
    }

    //Check if this element has an unique solution
    CheckUnique = (number) => {
        const t = this;
        let unique = 0;
        const {
            x,
            y,
            i,
            j
        } = number;
        unique = t.UniqueList(t.matrix[x][y].checklist, number);
        if (unique !== 0) {
            number.SetValue(unique);
            return true;
        }
        unique = t.UniqueList(t.verticallines[x][i], number);
        if (unique !== 0) {
            number.SetValue(unique);
            return true;
        }
        unique = t.UniqueList(t.horizontallines[y][j], number);
        if (unique !== 0) {
            number.SetValue(unique);
            return true;
        }
        return false;
    }


    // Check if this array has an unique solution
    UniqueList = (arr, number) => {
        const t = this;
        let options = new Set();
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.number === "" && element !== number) {
                element.SetValueOptions(t.CheckOptions(element));
                options = new Set([...options, ...element.options]);
            }
        }
        number.SetValueOptions(t.CheckOptions(number));
        let difference = new Set([...number.options].filter(x => !options.has(x)));
        if (difference.size === 1) {
            return difference.values().next().value;
        }
        return 0;
    }



}

export default SudokuResolver;