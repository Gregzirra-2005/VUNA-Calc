// src/calculator.js
// Pure calculator logic - CommonJS version for Jest/Node.js testing

class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
    }
    
    appendNumber(num) {
        if (this.waitingForOperand) {
            this.currentValue = '';
            this.waitingForOperand = false;
        }
        this.currentValue += num.toString();
        return this.currentValue;
    }
    
    appendDecimal() {
        if (this.waitingForOperand) {
            this.currentValue = '0';
            this.waitingForOperand = false;
        }
        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        return this.currentValue;
    }
    
    setOperator(op) {
        if (this.currentValue === '' && this.previousValue === '') {
            return null;
        }
        
        if (this.previousValue !== '' && this.currentValue !== '') {
            this.calculate();
        }
        
        this.operator = op;
        this.previousValue = this.currentValue;
        this.waitingForOperand = true;
        return this.operator;
    }
    
    calculate() {
        if (this.operator === null || this.currentValue === '' || this.previousValue === '') {
            return this.currentValue || '0';
        }
        
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let calculationResult = 0;
        
        switch (this.operator) {
            case '+':
                calculationResult = prev + current;
                break;
            case '-':
                calculationResult = prev - current;
                break;
            case '*':
                calculationResult = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.clear();
                    throw new Error('Division by zero');
                }
                calculationResult = prev / current;
                break;
            case '%':
                // MODULO - Your unique feature!
                if (current === 0) {
                    this.clear();
                    throw new Error('Modulo by zero');
                }
                calculationResult = prev % current;
                break;
            default:
                return this.currentValue;
        }
        
        // Round to avoid floating point issues
        calculationResult = parseFloat(calculationResult.toFixed(10));
        
        this.currentValue = calculationResult.toString();
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = true;
        return this.currentValue;
    }
    
    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        return '0';
    }
    
    backspace() {
        if (this.currentValue.length > 0) {
            this.currentValue = this.currentValue.slice(0, -1);
            if (this.currentValue === '') {
                this.currentValue = '0';
                this.waitingForOperand = false;
            }
        }
        return this.currentValue || '0';
    }
    
    getDisplayValue() {
        if (this.currentValue === '') return '0';
        return this.currentValue;
    }
}

// CommonJS export for Jest/Node.js testing
module.exports = Calculator;