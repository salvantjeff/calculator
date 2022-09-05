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

// Select html elements
const buttons = document.querySelectorAll('.input-value');
const screen = document.querySelector('.inputs');
const screenHistory = document.querySelector('.history');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.enter');
const backButton = document.querySelector('.back');
const clearButton = document.querySelector('.clear');
const placeholder = document.querySelector('.placeholder');

// Define variables
let userInputs = [];
let count = 0;
let index = -1;
let dotCount = 0;

function handleNumbers(subject){

    console.log(subject)
    let value = subject.dataset.val;
    if (value === '.') {
        console.log(value)
        if (dotCount >= 1){
            value = '';
        }
        dotCount++;
    } else {
        value = parseFloat(subject.dataset.val)
    }
   
    userInputs.push(value)
    
    let numInputs = extractValues()
    screen.textContent = (numInputs.num2) ? numInputs.num2 : numInputs.num1;
    screenHistory.textContent = userInputs.join('');
    
    index++;
    console.log(userInputs)
}