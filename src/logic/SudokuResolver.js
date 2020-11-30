import qqwing from 'qqwing';
import Sudoku from './Sudoku';

class SudokuResolver extends Sudoku {
    constructor(n, cacheboard = null, newboard = false) {
        super();
        this.errorcount = 0;
        this.difficultycount = 0;
        if (cacheboard !== null) {
            this.RestoreBoard(cacheboard);
        } else if (!newboard) {
            this.CreateBoard(n);
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

    CreateBoard = (n) => {
        const t = this;
        var t1 = performance.now();
        var q = new qqwing();
        q.setRecordHistory(true);
        q.setPrintStyle(qqwing.PrintStyle.READABLE);
        var tries = 0;
        var best = {
            closer: 10,
            difficulty: 0,
            puzzle: ""
        }
        var difficultytarget = n;

        while (q.getDifficulty() !== difficultytarget && tries < 10) {
            q.generatePuzzle();
            q.solve();
            tries++;
            const closer = Math.abs(difficultytarget - q.getDifficulty());
            if (best.closer > closer) {
                best = {
                    closer: closer,
                    difficulty: q.getDifficulty(),
                    puzzle: q.getPuzzleString()
                }
            }
        }
        this.difficulty=best.difficulty;
        var t2 = performance.now();
        console.log(t2 - t1, tries);
        t.FromString(best.puzzle);
    }

    FromString = (boardstring) => {
        const t = this;
        var board = boardstring.split("-").join("").trim().split("\n");
        var newboard = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ] ];
        var y1 = 0;
        var i1 = 0;
        board.forEach((row, i) => {
            var r = row.split("|");
            var x1 = 0;
            r.forEach((column, j) => {
                if (column !== "") {
                    var c = column.trim().split(" ");
                    newboard[x1][y1][i1] = c;
                    x1++;
                    if (x1 > 2) {
                        x1 = 0;
                    }
                } else {
                    r=null;
                    return;
                }
            });
            if(r!==null){
                i1++;
                if (i1 > 2) {
                    i1 = 0;
                    y1++;
                }
                if (y1 > 2) {
                    y1 = 0;
                }
            }
        });
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const number = newboard[x][y][j][i];
                        const element = t.matrix[x][y].submatrix[i][j];
                        if (number !== ".") {
                            element.SetValue(parseInt(number));
                            element.locked = true;
                        } else {
                            element.SetValue("");
                            element.locked = false;
                        }
                        element.SetValueOptions(new Set());
                        element.SetValueError(false);
                    }

                }

            }

        }

    }

    CreateBoard2 = (n, deep = 0) => {
        var t0 = performance.now();
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
        t.fullboard = t.CloneBoard();
        if (deep === 0) {
            t.CleanBoard(n);
        }
        var t1 = performance.now();
        if (deep === 0) {
            console.log("CreateSudoku took " + (t1 - t0) + " milliseconds.");
        }
    }
    CleanBoard = (n) => {
        const t = this;
        t.difficultycount = 0;
        if (n > 81 || n < 1) {
            throw Error("number out of range");
        }
        const emptyspaces = [...t.emptyspaces];
        t.removed = 0;

        let maxdiff = 0;
        while (t.removed < 81 - n && emptyspaces.length > 0) {
            const pos = Math.floor(Math.random() * (emptyspaces.length - 1));
            const current = emptyspaces[pos];
            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            const tmp = field.number;
            field.SetValue("");
            const tmpdifficultycount = t.difficultycount;
            const clonelist = t.CloneBoard();
            const solutions = t.ResolveUnique();
            t.RestoreBoard(clonelist);
            if (solutions === 0) {
                console.log(solutions, "solutions");
            }
            if (solutions === 1) {
                t.difficultycount++;
                if (t.difficultycount - tmpdifficultycount > maxdiff) {
                    maxdiff = t.difficultycount - tmpdifficultycount;
                }
                t.removed++;
            } else {
                t.difficultycount = tmpdifficultycount;
                field.SetValue(tmp);
            }
            emptyspaces.splice(pos, 1);
        }

        t.difficultycount = maxdiff;
        for (let index = 0; index < t.emptyspaces.length; index++) {
            const current = t.emptyspaces[index];
            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            if (field.number !== "") {
                field.locked = true;
            }
        }
    }


    ResolveUnique = (depth = 0, solutions = 0) => {
        const t = this;
        if (solutions > 1) {
            return solutions;
        }
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
            if (changes > 0) {
                t.difficultycount += (changes + (depth * 100));
                // t.difficultycount += (changes * (depth+1));
                // console.log("depth",depth,t.difficultycount);
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
                    const tmpdifficultycount = t.difficultycount;
                    solutions = t.ResolveUnique(depth + 1, solutions);
                    // console.log(sol,solutions);

                    if (solutions === 0) {
                        t.difficultycount = tmpdifficultycount;
                    }
                    solutions += sol;

                    if (solutions > 1) {
                        return solutions;
                    }
                } catch (error) {
                    // console.log(error.message, t.errorcount, "Submatrix", "depth:", depth);
                    return 0;
                } finally {
                    if (!t.arrayEquals(randomoptions, [...randomtry.options])) {
                        randomoptions = [...randomtry.options];
                        i = 0;
                        console.log("restart", solutions);
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
                return t.ResolveUnique(depth + 1, solutions);
            } else {
                if (solutions === 0) {
                    solutions = 1;
                }
                // solutions++;
                //solutions=1;
                return solutions;
            }
        } else {
            // console.log(solutions);

            // if(solutions===0){
            //     solutions=1;
            // }
            solutions++;
            // solutions=1;
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