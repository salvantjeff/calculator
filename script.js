// CALCULATOR FUNCTIONS
let roundPlace = 5;
const add = function (num1, num2) {
    let result = num1 + num2;
    if (typeof result !== 'number') return null;
    else return parseFloat(result.toFixed(roundPlace));
}

const subtract = function (num1, num2) {
    let result = num1 - num2;
    if (typeof result !== 'number') return null;
    else return parseFloat(result.toFixed(roundPlace));
}

const multiply = function (num1, num2) {
    let result = num1 * num2;
    if (typeof result !== 'number') return null;
    else return parseFloat(result.toFixed(roundPlace));
}

const divide = function (num1, num2) {
    let result = num1 / num2;
    if (typeof result !== 'number') return null;
    else return parseFloat(result.toFixed(roundPlace));
}

function operate(operator, num1, num2) {
    const operators = {
        '/': divide,
        '*': multiply,
        '+': add,
        '-': subtract
    }

    if (!(operator in operators)) return 'invalid operator';
    else return operators[operator](num1, num2);
}
