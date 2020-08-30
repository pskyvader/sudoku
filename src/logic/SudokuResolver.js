import Sudoku from './Sudoku';

class SudokuResolver extends Sudoku {
    constructor(n, cacheboard = null) {
        super();
        this.errorcount = 0;
        if (cacheboard === null) {
            var t0 = performance.now();
            this.CreateBoard(n);
            var t1 = performance.now();
            console.log("Call to CreateSudoku took " + (t1 - t0) + " milliseconds.");
        } else {
            this.RestoreBoard(cacheboard);
        }
    }




    RandomNumbers = (number) => {
        const t = this;
        if (number > 81 || number < 1) {
            throw console.error("number out of range");
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

            field.locked = true;
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
            console.log(error.message, t.errorcount, "deep:", deep);
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
            throw console.error("number out of range");
        }
        const emptyspaces = t.emptyspaces;
        for (let index = 0; index < n; index++) {
            const pos = Math.floor(Math.random() * (emptyspaces.length - 1));
            const current = emptyspaces[pos];
            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.locked = true;
            emptyspaces.splice(pos, 1);
        }

        for (let index = 0; index < emptyspaces.length; index++) {
            const current = emptyspaces[index];
            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.locked = false;
            field.number = "";
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
                    console.log(error.message, t.errorcount, "Submatrix", "deep:", deep);
                } finally {
                    if (randomoptions !== randomtry.options) {
                        randomoptions = [...randomtry.options];
                    } else {
                        i++;
                    }
                    randomtry.number = randomoptions[i];
                }
            }
            if (!t.CheckCompleteBoard()) {
                t.Resolve();
            } else {
                randomtry.SetValue(randomtry.number);
                randomtry.options.clear();
            }
        }
    }

    CloneBoard = () => {
        const t = this;
        let clonelist = [];
        for (let i = 0; i < t.list.length; i++) {
            const e = t.list[i];
            clonelist.push({ x: e.x, y: e.y, i: e.i, j: e.j, number: e.number, options: e.options, locked: e.locked, error: e.error });
        }
        return clonelist;
    }
    RestoreBoard = (clonelist) => {
        const t = this;
        for (let index = 0; index < clonelist.length; index++) {
            const e = clonelist[index];
            const element = t.matrix[e.x][e.y].submatrix[e.i][e.j];
            element.SetValue(e.number);
            element.options = e.options;
            element.locked = e.locked;
            element.error = e.error;
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


    Random = (min = 3) => {
        const t = this;
        for (let i = 0; i < t.list.length; i++) {
            const element = t.list[i];
            if (element.number === "") {
                t.CheckOptions(element);
                if (element.options.size < min) {
                    return element;
                }
            }
        }
        return t.Random(min + 1);
    }


    FillSingleOption = () => {
        const t = this;
        let changes = 0;
        for (let index = 0; index < t.list.length; index++) {
            const element = t.list[index];
            if (element.number === "") {
                t.CheckOptions(element);
                if (element.options.size === 1) {
                    element.SetValue(element.options.values().next().value);
                    element.options.clear();
                    changes++;
                }
            }
        }
        return changes;
    }

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

    UniqueList = (arr, number) => {
        const t = this;
        let options = new Set();
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.number === "" && element !== number) {
                t.CheckOptions(element);
                options = new Set([...options, ...element.options]);
            }
        }
        t.CheckOptions(number);
        let difference = new Set([...number.options].filter(x => !options.has(x)));
        if (difference.size === 1) {
            return difference.values().next().value;
        }
        return 0;
    }

    CheckOptions = (number) => {
        const t = this;
        let list = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const {
            x,
            y,
            i,
            j
        } = number;
        t.DuplicatesList(t.matrix[x][y].checklist, list);
        t.DuplicatesList(t.verticallines[x][i], list);
        t.DuplicatesList(t.horizontallines[y][j], list);
        number.options = list;
    }

    DuplicatesList = (arr, list) => {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.number !== "") {
                list.delete(element.number);
            }
        }
        if (list.size === 0) {
            throw Error("Empty options");
        }
    }

}

export default SudokuResolver;