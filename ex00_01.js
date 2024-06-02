function removeReps(array) {
    const newSet = new Set(array);
    const uniqueNumbers = Array.from(newSet);
    return uniqueNumbers;
}

console.log(removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11]));
console.log(removeReps([1,1,1,1]));
console.log(removeReps([1,2,3,4,5,6]));

