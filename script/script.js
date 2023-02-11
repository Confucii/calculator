let displayVal = "";

const calcBtn = document.querySelectorAll(".calc-btn");
const output = document.querySelector("#output");
const acBtn = document.querySelector("#ac-btn");
const opBtn = document.querySelectorAll(".op-btn");

let calcList = [];
let idx = 0;

acBtn.addEventListener('click', clear);


calcBtn.forEach(element => {
    element.addEventListener('click', addNum);    
});

opBtn.forEach(element => {
    element.addEventListener('click', addOp);    
});

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    let operationResult;

    if (operator === "+") {
        operationResult = add(x, y);
    } else if (operator === "-") {
        operationResult = subtract(x, y);
    } else if (operator === "*") {
        operationResult = multiply(x, y);
    } else if (operator === "/") {
        operationResult = divide(x, y);
    }
    return operationResult;
}

function clear() {
    displayVal = "";
    output.textContent = "";
}

function addNum() {
    displayVal += this.textContent;
    output.textContent = displayVal;
}

function addOp() {
    if (displayVal.charAt(displayVal.length - 1).match(/[0-9]/) !== null) {
        displayVal += ` ${this.textContent} `;
        output.textContent = displayVal;
    }
}