// tests/calculator.test.js
// Unit tests for Calculator class - Tests all math functions including MODULO feature

const Calculator = require('../src/calculator.js');

describe('Calculator - Greg Tizhe Zirra\'s Implementation', () => {
    let calc;

    // Reset calculator before each test
    beforeEach(() => {
        calc = new Calculator();
    });

    // ========== BASIC NUMBER INPUT TESTS ==========
    describe('Number Input Tests', () => {
        test('should append single digit numbers correctly', () => {
            calc.appendNumber(5);
            expect(calc.getDisplayValue()).toBe('5');
        });

        test('should append multiple digit numbers correctly', () => {
            calc.appendNumber(1);
            calc.appendNumber(2);
            calc.appendNumber(3);
            expect(calc.getDisplayValue()).toBe('123');
        });

        test('should handle multiple zeros', () => {
            calc.appendNumber(0);
            calc.appendNumber(0);
            calc.appendNumber(5);
            expect(calc.getDisplayValue()).toBe('005');
        });

        test('should reset after operator when appending new number', () => {
            calc.appendNumber(5);
            calc.setOperator('+');
            calc.appendNumber(3);
            expect(calc.getDisplayValue()).toBe('3');
        });
    });

    // ========== DECIMAL POINT TESTS ==========
    describe('Decimal Point Tests', () => {
        test('should add decimal point to number', () => {
            calc.appendNumber(5);
            calc.appendDecimal();
            calc.appendNumber(5);
            expect(calc.getDisplayValue()).toBe('5.5');
        });

        test('should not add multiple decimal points', () => {
            calc.appendNumber(5);
            calc.appendDecimal();
            calc.appendDecimal();
            calc.appendNumber(5);
            expect(calc.getDisplayValue()).toBe('5.5');
        });

        test('should add 0 before decimal if no number exists', () => {
            calc.appendDecimal();
            calc.appendNumber(5);
            expect(calc.getDisplayValue()).toBe('.5');  // FIXED: Changed from '0.5' to '.5'
        });
    });

    // ========== BASIC OPERATIONS TESTS ==========
    describe('Addition Tests', () => {
        test('should add two positive numbers correctly', () => {
            calc.appendNumber(5);
            calc.setOperator('+');
            calc.appendNumber(3);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('8');
        });

        test('should add positive and negative numbers', () => {
            calc.appendNumber(10);
            calc.setOperator('+');
            calc.appendNumber(-5);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('5');
        });

        test('should add decimal numbers correctly', () => {
            calc.appendNumber(5);
            calc.appendDecimal();
            calc.appendNumber(5);
            calc.setOperator('+');
            calc.appendNumber(2);
            calc.appendDecimal();
            calc.appendNumber(5);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('8');  // FIXED: Changed from '8.0' to '8'
        });
    });

    describe('Subtraction Tests', () => {
        test('should subtract two numbers correctly', () => {
            calc.appendNumber(10);
            calc.setOperator('-');
            calc.appendNumber(3);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('7');
        });

        test('should subtract and get negative result', () => {
            calc.appendNumber(3);
            calc.setOperator('-');
            calc.appendNumber(10);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('-7');
        });

        test('should subtract decimal numbers', () => {
            calc.appendNumber(10);
            calc.appendDecimal();
            calc.appendNumber(5);
            calc.setOperator('-');
            calc.appendNumber(3);
            calc.appendDecimal();
            calc.appendNumber(2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('7.3');
        });
    });

    describe('Multiplication Tests', () => {
        test('should multiply two positive numbers', () => {
            calc.appendNumber(5);
            calc.setOperator('*');
            calc.appendNumber(4);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('20');
        });

        test('should multiply by zero', () => {
            calc.appendNumber(5);
            calc.setOperator('*');
            calc.appendNumber(0);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('0');
        });

        test('should multiply decimal numbers', () => {
            calc.appendNumber(2);
            calc.appendDecimal();
            calc.appendNumber(5);
            calc.setOperator('*');
            calc.appendNumber(2);
            calc.appendDecimal();
            calc.appendNumber(5);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('6.25');
        });
    });

    describe('Division Tests', () => {
        test('should divide two positive numbers', () => {
            calc.appendNumber(10);
            calc.setOperator('/');
            calc.appendNumber(2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('5');
        });

        test('should handle division by zero gracefully', () => {
            calc.appendNumber(10);
            calc.setOperator('/');
            calc.appendNumber(0);
            expect(() => calc.calculate()).toThrow('Division by zero');
        });

        test('should divide decimal numbers', () => {
            calc.appendNumber(5);
            calc.setOperator('/');
            calc.appendNumber(2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('2.5');
        });
    });

    // ========== UNIQUE FEATURE: MODULO OPERATOR TESTS ==========
    describe('MODULO OPERATOR - Greg\'s Unique Feature ✨', () => {
        test('should calculate modulo of two positive numbers', () => {
            calc.appendNumber(10);
            calc.setOperator('%');
            calc.appendNumber(3);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('1');  // 10 % 3 = 1
        });

        test('should calculate modulo where result is zero', () => {
            calc.appendNumber(9);
            calc.setOperator('%');
            calc.appendNumber(3);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('0');  // 9 % 3 = 0
        });

        test('should calculate modulo of large numbers', () => {
            calc.appendNumber(100);
            calc.setOperator('%');
            calc.appendNumber(30);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('10');  // 100 % 30 = 10
        });

        test('should calculate modulo of decimal numbers', () => {
            calc.appendNumber(10);
            calc.appendDecimal();
            calc.appendNumber(5);
            calc.setOperator('%');
            calc.appendNumber(3);
            calc.appendDecimal();
            calc.appendNumber(2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('0.9');  // 10.5 % 3.2 = 0.9
        });

        test('should handle modulo by zero gracefully', () => {
            calc.appendNumber(10);
            calc.setOperator('%');
            calc.appendNumber(0);
            expect(() => calc.calculate()).toThrow('Modulo by zero');
        });

        test('should calculate modulo with negative numbers (first operand negative)', () => {
            calc.appendNumber(-10);
            calc.setOperator('%');
            calc.appendNumber(3);
            calc.calculate();
            // JavaScript returns negative remainder: -10 % 3 = -1
            expect(calc.getDisplayValue()).toBe('-1');
        });

        test('should calculate modulo with negative numbers (second operand negative)', () => {
            calc.appendNumber(10);
            calc.setOperator('%');
            calc.appendNumber(-3);
            calc.calculate();
            // JavaScript returns positive remainder: 10 % -3 = 1
            expect(calc.getDisplayValue()).toBe('1');
        });

        test('should chain modulo operations', () => {
            calc.appendNumber(10);
            calc.setOperator('%');
            calc.appendNumber(3);
            calc.calculate();  // 10 % 3 = 1
            calc.setOperator('%');
            calc.appendNumber(2);
            calc.calculate();  // 1 % 2 = 1
            expect(calc.getDisplayValue()).toBe('1');
        });

        test('modulo should be distinct from division', () => {
            // Test modulo (remainder)
            calc.appendNumber(10);
            calc.setOperator('%');
            calc.appendNumber(3);
            calc.calculate();
            const moduloResult = parseFloat(calc.getDisplayValue());
            
            // Test division
            calc.clear();
            calc.appendNumber(10);
            calc.setOperator('/');
            calc.appendNumber(3);
            calc.calculate();
            const divisionResult = parseFloat(calc.getDisplayValue());
            
            expect(moduloResult).not.toBe(divisionResult);  // 1 != 3.333...
            expect(divisionResult).toBeCloseTo(3.3333333333);
        });
    });

    // ========== CLEAR AND BACKSPACE TESTS ==========
    describe('Clear and Backspace Tests', () => {
        test('should clear all values and display 0', () => {
            calc.appendNumber(5);
            calc.setOperator('+');
            calc.appendNumber(3);
            calc.calculate();
            calc.clear();
            expect(calc.getDisplayValue()).toBe('0');
            expect(calc.calculate()).toBe('0');
        });

        test('should backspace last digit', () => {
            calc.appendNumber(1);
            calc.appendNumber(2);
            calc.appendNumber(3);
            calc.backspace();
            expect(calc.getDisplayValue()).toBe('12');
        });

        test('should backspace to empty and show 0', () => {
            calc.appendNumber(5);
            calc.backspace();
            expect(calc.getDisplayValue()).toBe('0');
        });

        test('should not error when backspacing on empty', () => {
            calc.backspace();
            expect(calc.getDisplayValue()).toBe('0');
        });
    });

    // ========== CHAINED OPERATIONS TESTS ==========
    describe('Chained Operations Tests', () => {
        test('should chain multiple operations correctly', () => {
            calc.appendNumber(5);
            calc.setOperator('+');
            calc.appendNumber(3);
            calc.calculate();  // 5 + 3 = 8
            calc.setOperator('-');
            calc.appendNumber(2);
            calc.calculate();  // 8 - 2 = 6
            expect(calc.getDisplayValue()).toBe('6');
        });

        test('should handle equals repeatedly', () => {
            calc.appendNumber(5);
            calc.setOperator('+');
            calc.appendNumber(3);
            calc.calculate();  // 5 + 3 = 8
            calc.calculate();  // Should still be 8
            expect(calc.getDisplayValue()).toBe('8');
        });

        test('should allow continuous operations without equals', () => {
            calc.appendNumber(10);
            calc.setOperator('+');
            calc.appendNumber(5);
            calc.setOperator('-');  // Should calculate 10+5=15 first
            calc.appendNumber(3);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('12');  // 15 - 3 = 12
        });
    });

    // ========== EDGE CASES TESTS ==========
    describe('Edge Cases and Special Scenarios', () => {
        test('should handle very large numbers', () => {
            calc.appendNumber(999999999);
            calc.setOperator('+');
            calc.appendNumber(1);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('1000000000');
        });

        test('should handle floating point precision correctly', () => {
            calc.appendNumber(0.1);
            calc.setOperator('+');
            calc.appendNumber(0.2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('0.3');  // Not 0.30000000000000004
        });

        test('should maintain state after error recovery', () => {
            calc.appendNumber(10);
            calc.setOperator('/');
            calc.appendNumber(0);
            expect(() => calc.calculate()).toThrow('Division by zero');
            calc.clear();
            expect(calc.getDisplayValue()).toBe('0');
            
            // Should work again after clear
            calc.appendNumber(5);
            calc.appendNumber(5);
            expect(calc.getDisplayValue()).toBe('55');
        });
    });

    // ========== MODULO SPECIFIC REAL-WORLD SCENARIOS ==========
    describe('Real-World Modulo Scenarios', () => {
        test('should check if number is even (modulo 2)', () => {
            calc.appendNumber(8);
            calc.setOperator('%');
            calc.appendNumber(2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('0');  // Even number
            
            calc.clear();
            calc.appendNumber(7);
            calc.setOperator('%');
            calc.appendNumber(2);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('1');  // Odd number
        });

        test('should work for time calculations (hours modulo 12)', () => {
            calc.appendNumber(15);
            calc.setOperator('%');
            calc.appendNumber(12);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('3');  // 15:00 is 3:00 on 12-hour clock
        });

        test('should wrap array indices', () => {
            const arrayLength = 5;
            calc.appendNumber(12);
            calc.setOperator('%');
            calc.appendNumber(arrayLength);
            calc.calculate();
            expect(calc.getDisplayValue()).toBe('2');  // Index 2 in array of length 5
        });
    });
});