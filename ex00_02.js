function removeString(message, symbol) {
// var re = new RegExp(symbol, 'gim'); //i - игнорирует регистр
    var re = new RegExp(symbol, 'gm');
    var txt = message.replace(re,"");
    return txt;
}

console.log(removeString("Большое и интересное сообщение", "о"));
console.log(removeString("Hello world!", "z"));
console.log(removeString("А роза азора", "А"));