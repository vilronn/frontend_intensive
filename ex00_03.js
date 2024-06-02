function counter() {
    let count = 0;
  
    return function() {
      return 3*count++; // есть доступ к внешней переменной "count"
    };
  }
  
  let l_counter = counter();
  
  console.log(l_counter()); // 0
  console.log(l_counter()); // 3
  console.log(l_counter()); // 6
  console.log(l_counter()); // 9
