let displayVal = "";

//selecting all relevant elements of DOM
const calcBtn = document.querySelectorAll(".calc-btn");
const output = document.querySelector("#output");
const acBtn = document.querySelector("#ac-btn");
const opBtn = document.querySelectorAll(".op-btn");
const solBtn = document.querySelector("#sol-btn");
const flBtn = document.querySelector("#fl-btn");
const delBtn = document.querySelector("#del-btn")

let calcList = [];
let idx = 0;

delBtn.addEventListener('click', del)

flBtn.addEventListener('click', float);

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
    if (displayVal.charAt(idx) === "0") {
        displayVal = displayVal.slice(0, idx);
        displayVal += this.textContent;
        output.textContent = displayVal;
    } else if (!(this.textContent === "0" && (displayVal.charAt(displayVal.length - 2) === "/"))) {
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

        let whileCond = true;
        while (whileCond) {
            let mult = calcList.indexOf("*");
            let div = calcList.indexOf("/");

            if (mult === div) {
                whileCond = false;
            } else if (mult === -1) {
                performMultDiv(div - 1);
            } else if (div === -1) {
                performMultDiv(mult - 1);
            } else {
                if (mult < div) {
                    performMultDiv(mult - 1);
                } else {
                    performMultDiv(div - 1);
                }
            }
        }

        let opNum = Math.floor(calcList.length / 2);

        for(let i = 0; i < opNum; i++) {
            calcList.unshift(operate(parseFloat(calcList.shift()), calcList.shift(), parseFloat(calcList.shift())));
        }

        displayVal = `${parseFloat(calcList[0].toFixed(3))}`;
        idx = 0;
        output.textContent = parseFloat(calcList.shift().toFixed(3));
    }
}

//function checks whether the current input is a string of only numbers, if it is then decimal point can be added
function float() {
    if (displayVal.slice(idx).match(/^[0-9]+$/)) {
        displayVal += this.textContent;
        output.textContent = displayVal;
    }
}

//function checks whether the deleted element is a space (which means that there is an operator before that)
//then it transforms the string and array to restore the state before the operator was added and move idx
//to proper place
function del() {
    if (displayVal.charAt(displayVal.length - 1) === " ") {
        displayVal = displayVal.slice(0, displayVal.length - 3);
        output.textContent = displayVal;
        idx -= 3 + calcList[calcList.length - 2].length;
        calcList.splice(calcList.length - 2, 2);
    } else {
        displayVal = displayVal.slice(0, displayVal.length - 1);
        output.textContent = displayVal;
    }
}

//delete used operands and operators from list and add the result
function performMultDiv(idx) {
    let temp = calcList.splice(idx, 3);
    calcList.splice(idx, 0, operate(parseFloat(temp[0]), temp[1], parseFloat(temp[2])))
}