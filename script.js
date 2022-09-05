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

function handleOperators() {
    let operator = this.dataset.val

    userInputs.push(operator)
    dotCount = 0;
    count++;
    index++;
    console.log(userInputs)
    if (count >= 2) {
        let results = handleRobustCalcs();
        console.log(results);
        let calc = [handleCalculation(results)];
        console.log(calc)
        newArr = calc.concat(userInputs.slice(index))
        console.log(newArr, userInputs)
        userInputs = [...newArr];
        console.log(newArr, userInputs)
        count--;
        index = userInputs.length - 1;
    }
}

function extractValues() {
    let first = [];
    let second = [];
    let i = 0;
    let current = userInputs[i];
    while (typeof current === 'number' || current === '.') {
        first.push(current);
        i++;
        current = userInputs[i];
    }
    let theOperator = userInputs[i]
    while (i+1 < userInputs.length) {
        current = userInputs[i+1];
        second.push(current);
        i++;
    }
    console.log(first, second)
    let num1 = first.map(item => `${item}`).join('');
    let num2 = second.map(item => `${item}`).join('');
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    const values = {
        num1: num1,
        num2: num2,
        theOperator: theOperator
    }
    return values
}

function handleCalculation(inputs){
    let result;
    switch (inputs.theOperator) {
        case '+':
            result = operate(inputs.theOperator, inputs.num1, inputs.num2);
            screen.textContent = result;
            screenHistory.textContent = userInputs.join('');
            return result;
        case '-':
            result = operate(inputs.theOperator, inputs.num1, inputs.num2);
            screen.textContent = result;
            screenHistory.textContent = userInputs.join('');
            return result;
        case '*':
            result = operate(inputs.theOperator, inputs.num1, inputs.num2);
            screen.textContent = result;
            screenHistory.textContent = userInputs.join('');
            return result;
        case '/':
            result = operate(inputs.theOperator, inputs.num1, inputs.num2);
            if (result == Infinity) {
                result = ("this calculation is forbidden by the gods").toUpperCase()
            }
            screen.textContent = result;
            screenHistory.textContent = userInputs.join('');
            return result;
        default:
            return undefined;
    }
}

function handleBackButton() {
    userInputs.pop()
    let numInputs = extractValues()
    screen.textContent = (numInputs.num1) ? numInputs.num1 : 0;
    screenHistory.textContent = userInputs.join('');
    console.log(userInputs)
}

function handleClear() {
    while (userInputs.length > 0) {
        userInputs.pop();
    }
    console.log(userInputs)
    screen.textContent = 0;
    screenHistory.textContent = userInputs.join('');
    placeholder.textContent = 0;
    //reset initial values
    index = -1;
    count = 0;
    dotCount = 0;
}

function handleRobustCalcs() {

    if (count >= 2) {
        return extractValues();
    }
}

function handleNumbersFunc(){
    handleNumbers(this)
}

buttons.forEach(button => button.addEventListener('click', handleNumbersFunc));
operatorButtons.forEach(button => button.addEventListener('click', handleOperators));
equalButton.addEventListener('click', () => {
    let inputs = extractValues();
    return handleCalculation(inputs);
});
backButton.addEventListener('click', handleBackButton);
clearButton.addEventListener('click', handleClear);