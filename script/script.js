let displayVal = "";

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

function clear() {
    displayVal = "";
    output.textContent = "";
}

function addNum() {
    displayVal += this.textContent;
    output.textContent = displayVal;
}

function addOp() {
    let currLength = displayVal.length;
    if (displayVal.charAt(currLength - 1).match(/[0-9]/) !== null) {
        calcList.push(displayVal.slice(idx));
        calcList.push(this.textContent);
        console.log(calcList)
        idx = currLength + 3;
        displayVal += ` ${this.textContent} `;
        output.textContent = displayVal;
    }
}

function solve() {
    if (displayVal.charAt(idx).match(/[0-9]/) !== null) {
        calcList.push(displayVal.slice(idx));
        let opNum = Math.floor(calcList.length / 2);
        for(let i = 0; i < opNum; i++) {
            calcList.unshift(operate(parseFloat(calcList.shift()), calcList.shift(), parseFloat(calcList.shift())));
        }
        displayVal = `${calcList[0]}`;
        idx = 0;
        output.textContent = calcList.shift();
    }
}