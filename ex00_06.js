function fibonachi(a) {
if (a < 0) {
    return -1;
}
    if ((a == 0) || (a == 1)) {
        return 1;
    }
    else {
        return (fibonachi(a-1) + fibonachi(a-2));
    }
    }
    
    console.log(fibonachi(1));
    console.log(fibonachi(0));
    console.log(fibonachi(2));
    console.log(fibonachi(3));
    console.log(fibonachi(4));
    console.log(fibonachi(-10));