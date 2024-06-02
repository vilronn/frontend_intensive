function Sudoku(str) {
    const size = 9;
    const boxSize = 3;

    let board = prettyBoard(str, size);

    const findEmpty = (board) => {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (board[r][c] === '-'){
                    return [r,c];
                }
            }
        }
        return null;
    }

    const validate = (num, pos, board) => {
        const [r,c] = pos;

        //Check rows
        for (let i = 0; i < size; i++) {
            if(board[i][c] === num && i !== r) {
                return false;
            }
        }
        //Check cols
        for (let j = 0; j < size; j++) {
            if(board[r][j] === num && j !== c) {
                return false;
            }
        }
        
        //Check box
        const boxRow = Math.floor(r/boxSize) * boxSize;
        const boxCol = Math.floor(c/boxSize) * boxSize;
        for (let i = boxRow; i < boxRow + boxSize; i++) {
            for (let j = boxCol; j < boxCol + boxSize; j++) {
                if (board[i][j] === num && i !== r && j !== c) {
                    return false;
                }
            }
        }

        return true;
    }


    const solve = () => {
        const currPos = findEmpty(board);

        if (currPos === null){
            return true;
        }
        for (let i = 1; i < size + 1; i++) {
            const currNum = i.toString();
            const isValid = validate(currNum, currPos, board);
            if (isValid) {
                const [x,y] = currPos;
                board[x][y] = currNum;

                if(solve()) {
                    return true;
                }
                board[x][y] = '-';
            }
        }


        return false;
    }

    solve();

return board;
}

function prettyBoard(str, len){
    let board = [];
    let kolvo = str.length/len;
    for(let i = 0; i < kolvo; i++){
        board.push([]);
    }

    for (let i = 0; i < kolvo; i++) {
            for(let j = 0; j < str.length; j++) {
        if (board[i].length < len){
                board[i].push(str[i*len + j]);   
        }
    }
    }
    return board;
}

input1 = "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";
input2 = "---6891--8------2915------84-3----5-2----5----9-24-8-1-847--91-5------6--6-41----";
input3 = "3---------5-7-3--8----28-7-7------43-----------39-41-54--3--8--1---4----968---2--";
input4 = "--7--8------2---6-65--79----7----3-5-83---67-2-1----8----71--38-2---5------4--2--";
console.table(prettyBoard(input1, 9));
console.table(Sudoku(input1));

console.table(Sudoku(input1));
console.table(Sudoku(input2));
console.table(Sudoku(input3));
console.table(Sudoku(input4));


console.table(Sudoku("53--7----6--195----98----6-8---6---34--8-3--17---2---6-6----28----419--5----8--79"));