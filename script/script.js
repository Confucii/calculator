//selecting all relevant elements of DOM
const calcBtn = document.querySelectorAll(".calc-btn");
const output = document.querySelector("#output");
const acBtn = document.querySelector("#ac-btn");
const opBtn = document.querySelectorAll(".op-btn");
const solBtn = document.querySelector("#sol-btn");
const flBtn = document.querySelector("#fl-btn");
const delBtn = document.querySelector("#del-btn")
const buttons = document.querySelectorAll("button")

//list of operators and operands
let calcList = [];

//cursor saving the position of the beginning of the newest number in the string 
//is needed to manipulate zero and float cases
let idx = 0;
let keyList = [];

buttons.forEach(button => keyList.push(button.dataset.key));

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

//add listener to keys so that when the key with corresponding data is pushed, it is visually visible and the 
//corresponding event is dispatched 
document.addEventListener('keydown', (e) => {
    if (keyList.find(element => element === e.key)) {
        const key = document.querySelector(`button[data-key="${e.key}"]`);
        key.dispatchEvent(new Event('click'));
        key.classList.add("pressed");
        setTimeout(() => {
            key.classList.remove("pressed");
        }, 200);
    }
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
    output.textContent = "";
    calcList = [];
    idx = 0;
}

//adds number to display, also handles some incorrect use cases for 0
function addNum() {
    if (output.textContent.charAt(idx) === "0" && output.textContent.charAt(idx + 1) !== ".") {
        output.textContent = output.textContent.slice(0, idx);
        output.textContent += this.textContent;
    } else {
        output.textContent += this.textContent;
    }
}

// appends operator to display
// remembers the index position of the place where new value will appear
// check whether there is a number to add operator to
function addOp() {
    let currLength = output.textContent.length;
    if (output.textContent.charAt(currLength - 1).match(/[0-9]/) !== null) {
        idx = currLength + 3;
        output.textContent += ` ${this.textContent} `;
    }
}

// iterates through operands and operators array to perform all arithmetic operations
// the arithmetic operations are saved in a list by splitting the display value on spaces
// first the iterations are performed while there is at least one multiplication or division
// then the rest of operands are done in successive manner
function solve() {
    if (output.textContent.charAt(idx).match(/[0-9]/) !== null) {
        calcList = output.textContent.split(" ");

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

        for (let i = 0; i < opNum; i++) {
            calcList.unshift(operate(parseFloat(calcList.shift()), calcList.shift(), parseFloat(calcList.shift())));
        }

        idx = 0;

        if (isFinite(calcList[0])) {  
            output.textContent = parseFloat(calcList.shift().toFixed(3));
        } else {
            calcList.shift();
            output.textContent = "Cannot divide by zero!";
        }
    }
}

//function checks whether the current input is a string of only numbers, if it is then decimal point can be added
function float() {
    if (output.textContent.slice(idx).match(/^[0-9]+$/)) {
        output.textContent += this.textContent;
    }
}

//function checks whether the deleted element is a space (which means that there is an operator before that)
//then it transforms the string to restore the state before the operator was added and move idx
//to proper place
function del() {
    if (output.textContent.charAt(output.textContent.length - 1) === " ") {
        output.textContent = output.textContent.slice(0, output.textContent.length - 3);
        idx -= 4;
        while(output.textContent.charAt(idx - 1) !== " " && idx !== 0) {
            idx -= 1;
        }
    } else {
        output.textContent = output.textContent.slice(0, output.textContent.length - 1);
    }
}

//delete used operands and operators from list and add the result
function performMultDiv(idx) {
    let temp = calcList.splice(idx, 3);
    calcList.splice(idx, 0, operate(parseFloat(temp[0]), temp[1], parseFloat(temp[2])))
}