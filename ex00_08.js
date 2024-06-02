const LEFT_DIAGONAL = 1;
const RIGHT_DIAGONAL = -1;
function searchSubString(puzzle, word) {
let result = 'false';
result = hori(puzzle, word);

if (result == 'false') {
    newArr = transposeArray(puzzle, puzzle[0].length);
    result = hori(newArr, word);
    if (result == 'false') {
        newDiaArr = diagonal(puzzle, LEFT_DIAGONAL);
        result = hori(newDiaArr, word);
        if (result == 'false') {
            newDiaArr = diagonal(puzzle, RIGHT_DIAGONAL);
            result = hori(newDiaArr, word);
        }
    }
}
return result;
}

function diagonal(array, index) {
    arrayLength = array[0].length;

    let newArray = [];
    let new_length = array.length + arrayLength - 1;
    for(let i = 0; i < new_length; i++){
        newArray.push([]);
    }
  
  for(let i = 0; i < new_length; i++){
      for(let j = 0; j < arrayLength; j++){
        let vsp;
        if (index == LEFT_DIAGONAL) {
          vsp = i + j - arrayLength + 1;
        } else if (index == RIGHT_DIAGONAL) {
            vsp = i - j;
        }
  
          if ((vsp >= 0) && (vsp < array.length)){
          newArray[i].push(array[vsp][j]);
          } else {
              newArray[i].push('');
          }
      }
  }
    return newArray;
}

function hori(puzzle, word) {
    let result = 'false';
        for (i = 0; i < puzzle.length; i++) {
             let str2 = puzzle[i].toString();
             let mimi = word.split('');
             let mimi_s = mimi.toString();
             let imim = mimi.reverse();
             let imim_s = imim.toString();
             let res = str2.indexOf(mimi_s);
             let ser = str2.indexOf(imim_s);

            if ((res != -1) || (ser != -1)) {
            result = 'true'
            } 
        }
return result;
}

function transposeArray(array, arrayLength){
    let newArray = [];
    for(let i = 0; i < array.length; i++){
        newArray.push([]);
    };

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        };
    };

    return newArray;
}

const examplePuzzle = [
    ["b", "l", "g", "o", "l", "d", "s"],
    ["x", "k", "q", "w", "i", "j", "p"],
    ["a", "n", "l", "i", "b", "e", "n"],
    ["h", "e", "e", "e", "k", "i", "l"],
    ["q", "e", "k", "a", "y", "q", "a"],
    ["h", "u", "h", "a", "e", "a", "u"],
    ["k", "q", "j", "c", "c", "m", "r"],
  ];



console.log(searchSubString(examplePuzzle, "like")); // true
console.log(searchSubString(examplePuzzle, "gold")); // true
console.log(searchSubString(examplePuzzle, "queen")); // true
console.log(searchSubString(examplePuzzle, "aefg")); // false
console.log(searchSubString(examplePuzzle, "keb")); // true
console.log(searchSubString(examplePuzzle, "heei")); // true
console.log(searchSubString(examplePuzzle, "cake")); // true
console.log(searchSubString(examplePuzzle, "mew")); // false