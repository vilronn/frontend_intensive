function pascal(a, b) {
if (a == 0) {
    return 1;
}
if (b == 0) {
    return 1;
}
if (b == a) {
    return 1;
}
if (b < a && b > 0) {
    return pascal(a-1, b-1) + pascal(a-1, a-b-1)

} else {
    return -1;
}
}

// console.log(pascal(0, 0));

console.log(pascal(4, 0));
console.log(pascal(4, 1));
console.log(pascal(4, 2));
console.log(pascal(4, 3));
console.log(pascal(4, 4));

console.log(pascal(4, 7));