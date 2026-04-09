window.onload = function() {
    let a = '0';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    const outputElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    const clearButton = document.getElementById('btn_op_clear');
    const equalButton = document.getElementById('btn_op_equal');
    const multButton = document.getElementById('btn_op_mult');
    const plusButton = document.getElementById('btn_op_plus');
    const minusButton = document.getElementById('btn_op_minus');
    const divButton = document.getElementById('btn_op_div');
    const signButton = document.getElementById('btn_op_sign');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if(a.length === 15) return;
            if (digit !== '.') {
                if (a === '0') a = digit
                else a += digit;
                outputElement.innerHTML = a || '0';
            } else if (digit === '.' && !a.includes('.')) {
                a += digit;
                outputElement.innerHTML = a;
            }
        }
        else {
            if (b.length === 15) return;
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
                outputElement.innerHTML = b || '0';
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    signButton.onclick = function() {
        if (selectedOperation) {
            b *= -1;
        } else {
            a *= -1;
        }
        outputElement.innerHTML = a;
    }

    multButton.onclick = function() {
        if (a === '') return;
        selectedOperation = '×';
    };

    plusButton.onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    };

    minusButton.onclick = function() {
        if (a === '0') {
            a = '-';
            outputElement.innerHTML = a;
        } else {
            selectedOperation = '−';
        }
    };

    divButton.onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    };

    clearButton.onclick = function() {
        a = '0';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    equalButton.onclick = function() {
        if (a === '' || b === '' || selectedOperation === null) return;

        const numA = +a;
        const numB = +b;
        let result;

        switch (selectedOperation) {
            case '×':
                result = numA * numB;
                break;
            case '+':
                result = numA + numB;
                break;
            case '−':
                result = numA - numB;
                break;
            case '/':
                if (numB === 0) {
                    outputElement.innerHTML = 'Ошибка';
                    a = '';
                    b = '';
                    selectedOperation = null;
                    return;
                }
                result = numA / numB;
                break;
            default:
                return;
        }

        a = result.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };
};
