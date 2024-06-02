function curry(f) { // curry(f) выполняет каррирование
    return function(a) {
      return function(b) {
        return f(a, b);
      };
    };
  }

  function sum(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }
  function umn(a, b) {
    return a * b;
  }

  function div(a, b) {
    return a / b;
  }

  let plus = curry(sum);
  let minus = curry(sub);
  let mult = curry(umn);
  let divide = curry(div);

function one(f) {
    let a = 1;

   if (f != null) {
        return f(a);
      } else {
        return a;
        }

}
function two(f) {
    let a = 2;
    if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

function three(f) {
    let a = 3;

   if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

function four(f) {
    let a = 4;

   if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

function five(f) {
    let a = 5;
    if (f != null) {
        return f(a);
      } else {
        return a;
        }

}


function six(f) {
    let a = 6;
    if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

function seven(f) {
    let a = 7;
    if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

function eight(f) {
    let a = 8;
    if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

function nine(f) {
    let a = 9;
    if (f != null) {
        return f(a);
      } else {
        return a;
        }

}

console.log(five(plus(5)));
console.log(five(minus(3)));
console.log(five());

console.log(two(mult(three(plus(four())))));