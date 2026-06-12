// public/calculator-app.js
// This file connects the Calculator class to the DOM

// Import the Calculator class
import Calculator from './calculator.js';

// Create a global calculator instance
const calc = new Calculator();

// DOM interaction functions
function updateDisplay() {
    const displayElement = document.getElementById('result');
    if (displayElement) {
        displayElement.value = calc.getDisplayValue();
    }
}

// Attach functions to window so HTML onclick can find them
window.appendNumber = function(num) {
    calc.appendNumber(num);
    updateDisplay();
};

window.appendDecimal = function() {
    calc.appendDecimal();
    updateDisplay();
};

window.setOperator = function(op) {
    calc.setOperator(op);
    updateDisplay();
};

window.calculate = function() {
    try {
        calc.calculate();
    } catch (error) {
        const displayElement = document.getElementById('result');
        if (displayElement) {
            displayElement.value = error.message;
        }
        setTimeout(() => {
            calc.clear();
            updateDisplay();
        }, 1500);
        return;
    }
    updateDisplay();
};

window.clearDisplay = function() {
    calc.clear();
    updateDisplay();
};

window.backspace = function() {
    calc.backspace();
    updateDisplay();
};

// Initialize display
updateDisplay();

console.log('Calculator app loaded successfully!');