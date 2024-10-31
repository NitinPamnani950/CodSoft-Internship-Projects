const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '0';
let pendingValue = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'clear') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            inputNumber(value);
        }
    });
});

function clearDisplay() {
    displayValue = '0';
    pendingValue = null;
    operator = null;
    updateDisplay();
}

function inputNumber(value) {
    if (displayValue === '0') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function setOperator(op) {
    if (pendingValue === null) {
        pendingValue = parseFloat(displayValue);
    } else if (operator) {
        pendingValue = performOperation(pendingValue, parseFloat(displayValue), operator);
    }
    operator = op;
    displayValue = '0';
}

function calculateResult() {
    if (operator && pendingValue !== null) {
        displayValue = performOperation(pendingValue, parseFloat(displayValue), operator).toString();
        pendingValue = null;
        operator = null;
    }
    updateDisplay();
}

function performOperation(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;  // Multiplication case
        case '/': return a / b;
        default: return b;
    }
}

function updateDisplay() {
    display.textContent = displayValue;
}