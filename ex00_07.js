function atm(sum){

const kupyury =[5000,2000,1000,500, 200, 100,50];
let stroka = '';
vse_shtuki = 0;
if ((sum % 50) == 0) {
for (let i = 0; i < 7; i++) {
 shtuki = Math.floor(sum / kupyury[i]);
if (shtuki > 0) {
stroka+=(kupyury[i] + ': ' + shtuki+ ', ');
}
 sum = sum%kupyury[i];
 vse_shtuki+=shtuki;
}
if (vse_shtuki > 20) {
    stroka = 'Limit exceeded';
} else {
    stroka = stroka.slice(0, -2);
}

} else {
    stroka = 'Incorrect value';
}
return stroka;
} 

console.log(atm(8350));
console.log(atm(2570));
console.log(atm(100050));
console.log(atm(15500));