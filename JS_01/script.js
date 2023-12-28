// 1
const array = ['test_01', 'test_02', 'test_03', 'test_04', 'test_05', 'test_06'];
function printArrayElements(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(i, array[i]);
    }
}
printArrayElements(array);

// 2
const salaryInput = prompt('Enter your salary', 1000);
function rateYourSalary (salaryInput) {
    const salary = parseInt(salaryInput);
    if (salary >= 5000) {
        console.log('Perfect!');
    } else if (salary >= 3000 && salary < 5000) {
        console.log('Good!');
    } else if (salary >= 1500 && salary < 3000) {
        console.log('Norm!');
    } else if (salary >= 500 && salary < 1500) {
        console.log( 'წავა რა!');
    } else {
        console.log('ეჰ!');
    }
}
rateYourSalary(salaryInput);

// 3
const numArray = [15, 53, 22, 198, 10, 28, 16, 70, 33, 951];
function printOddNumbers(numArray) {
    numArray.forEach(number => {
        if (number % 2 !== 0) {
          console.log(number);
        }
      });
}
printOddNumbers(numArray);
