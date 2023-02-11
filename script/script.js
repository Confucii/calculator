let displayVal = "";

//selecting all relevant elements of DOM
const calcBtn = document.querySelectorAll(".calc-btn");
const output = document.querySelector("#output");
const acBtn = document.querySelector("#ac-btn");
const opBtn = document.querySelectorAll(".op-btn");
const solBtn = document.querySelector("#sol-btn");

let calcList = [];
let idx = 0;

solBtn.addEventListener('click', solve);

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

function operate(x, operator, y) {
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

//reset values for new calculation
function clear() {
    displayVal = "";
    output.textContent = "";
    calcList = [];
    idx = 0;
}

//adds number to display, also handles some incorrect use cases for 0
function addNum() {
    if (!(this.textContent === "0" && (displayVal.charAt(displayVal.length - 1) === " " || 
        displayVal === "" || 
        displayVal.charAt(displayVal.length - 2) === "/"))) {
        displayVal += this.textContent;
        output.textContent = displayVal;
    }
}

// appends operator to display, as well as stores new values to array of operands and operators
// remembers the index position of the place where new value will appear
function addOp() {
    let currLength = displayVal.length;
    if (displayVal.charAt(currLength - 1).match(/[0-9]/) !== null) {
        calcList.push(displayVal.slice(idx));
        calcList.push(this.textContent);
        idx = currLength + 3;
        displayVal += ` ${this.textContent} `;
        output.textContent = displayVal;
    }
}

// iterates through operands and operators array to perform all arithmetic operations it stored
function solve() {
    if (displayVal.charAt(idx).match(/[0-9]/) !== null) {
        calcList.push(displayVal.slice(idx));
        let opNum = Math.floor(calcList.length / 2);

        for(let i = 0; i < opNum; i++) {
            calcList.unshift(operate(parseFloat(calcList.shift()), calcList.shift(), parseFloat(calcList.shift())));
        }

        displayVal = `${parseFloat(calcList[0].toFixed(3))}`;
        idx = 0;
        output.textContent = parseFloat(calcList.shift().toFixed(3));
    }
}