import Sudoku from './Sudoku';

class SudokuResolver extends Sudoku {
    constructor(n) {
        super();
        this.errorcount = 0;
        this.CreateBoard(n);
    }


    RandomNumbers = (quantity) => {
        const t = this;
        if (quantity > 81 || quantity < 1) {
            throw console.error("quantity out of range");
        }
        for (let index = 0; index < quantity; index++) {
            const pos = Math.floor(Math.random() * (t.emptyspaces.length - 1));

            const current = t.emptyspaces[pos];


            let field = t.matrix[current[0]][current[1]].submatrix[current[2]][current[3]];
            field.number = Math.floor(1 + Math.random() * 8);
            t.CleanDuplicated();
            const duplicated = t.CheckDuplicates();
            if (duplicated > 0) {
                field.number = "";
                index--;
                continue;
            }

            field.locked = true;
            field.options.clear();
            t.emptyspaces.splice(pos, 1);
        }
    }

    CreateBoard = (n) => {
        const t = this;
        if (n > 81 || n < 1) {
            throw Error("number out of range");
        }
        t.RandomNumbers(27);

        try {
            t.Resolve();
        } catch (error) {
            t.errorcount += 1;
            console.log(error.message, t.errorcount);
            t.CreateEmptyBoard();
            t.CreateBoard(n);
        }
    }

    Resolve = () => {
        const t = this;
        let changes = 1;
        while (changes > 0) {
            changes = 0;
            changes += t.FillSingleOption(); // check if there are any field with only one option and use it
            if (changes === 0) {
                changes += t.FillByLine(); // check if there are any line or square with a unique number in its options and use it
            }
        }
        if (!this.CheckCompleteBoard()) {
            let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
            const randomtry = t.Random();
            randomtry.number = randomtry.options.values().next.value;
            try {
                t.Resolve();
            } catch (error) {
                console.log(error.message, t.errorcount, "le");
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

    GetOptions = () => {
        const t = this;
        for (let i = 0; i < t.list.length; i++) {
            const element = t.list[i];
            if (element.number === "") {
                t.CheckOptions(element);
            }
        }
    }

    FillSingleOption = () => {
        const t = this;
        let changes = 0;
        for (let index = 0; index < t.list.length; index++) {
            const element = t.list[index];
            if (element.number === "") {
                t.CheckOptions(element);
                if (element.options.size === 1) {
                    element.number = element.options.values().next().value;
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
            number.number = unique;
            return true;
        }
        unique = t.UniqueList(t.verticallines[x][i], number);
        if (unique !== 0) {
            number.number = unique;
            return true;
        }
        unique = t.UniqueList(t.horizontallines[y][j], number);
        if (unique !== 0) {
            number.number = unique;
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