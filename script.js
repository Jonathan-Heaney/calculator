'use strict';

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, a, b) {
  if (op === '+') {
    return add(a, b);
  } else if (op === '-') {
    return subtract(a, b);
  } else if (op === 'x') {
    return multiply(a, b);
  } else if (op === '÷') {
    if (b === 0) {
      return 'No';
    } else {
      return divide(a, b);
    }
  }
}

const display = document.querySelector('.display');
const displayText = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const buttons = document.querySelectorAll('button');
const result = document.querySelector('#result');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');
const mainButtons = document.querySelectorAll('.main-btn');
const decimalButton = document.querySelector('#decimal');

let a = '';
let b = '';
let op = '';
let answer;

for (let i = 0; i < mainButtons.length; i++) {
  mainButtons[i].addEventListener('click', function (e) {
    if (e.target.classList.contains('number-btn') && !op) {
      firstOperand(e);
    } else if (!op && e.target.classList.contains('operator-btn')) {
      firstOperator(e);
    } else if (
      (a || a === 0) &&
      op &&
      e.target.classList.contains('number-btn')
    ) {
      secondOperand(e);
    } else if (op && e.target.classList.contains('operator-btn')) {
      operateHelper(e);
      enableNum();
      disableOps();
      if (answer === 'No') {
        alertDivideZero();
      } else {
        showResultOperator(e);
      }
    } else if ((e.target.id = 'equals')) {
      if (a && b && op) {
        operateHelper(e);
        if (answer === 'No') {
          alertDivideZero();
        } else {
          showResultEquals(e);
        }
      }
    }
  });
}

function firstOperand(e) {
  enableOps();
  a += e.target.textContent;
  result.textContent = a;
  enableBackspace();
  if (result.textContent.includes('.')) {
    disableDec();
  } else enableDec();
}

function firstOperator(e) {
  op = e.target.textContent;
  displayText.textContent = `${a} ${op}`;
  disableDec();
  result.textContent = '';
  enableNum();
  disableOps();
}

function secondOperand(e) {
  b += e.target.textContent;
  result.textContent = b;
  enableBackspace();
  enableOps();
  if (result.textContent.includes('.')) {
    disableDec();
  } else enableDec();
}

function operateHelper(e) {
  a = Number(a);
  b = Number(b);
  answer = operate(op, a, b);
}

function showResultOperator(e) {
  answer = +answer.toFixed(5);
  result.textContent = answer;
  op = e.target.textContent;
  a = answer;
  b = '';
  displayText.textContent = `${a} ${op}`;
  enableDec();
  result.textContent = '';
  disableBackspace();
}

function showResultEquals(e) {
  answer = +answer.toFixed(5);
  result.textContent = answer;
  displayText.textContent = `${a} ${op} ${b}`;
  result.textContent = answer;
  disableDec();
  disableBackspace();
  disableNum();
  enableOps();
}

function alertDivideZero() {
  alert("You can't divide by 0!");
  clear();
}

function clear() {
  a = '';
  op = '';
  b = '';
  result.textContent = '0';
  displayText.textContent = '';
  enableDec();
  enableNum();
  disableOps();
}

function backspace() {
  if (a && !b) {
    let text = result.textContent;
    let newText = text.slice(0, -1);
    result.textContent = newText;
    a = newText;
  } else if (a && b) {
    let text = result.textContent;
    let newText = text.slice(0, -1);
    result.textContent = newText;
    b = newText;
  }
}

function disableDec() {
  decimalButton.disabled = true;
}

function enableDec() {
  decimalButton.disabled = false;
}

function disableBackspace() {
  backspaceButton.disabled = true;
}

function enableBackspace() {
  backspaceButton.disabled = false;
}

function disableNum() {
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].disabled = true;
  }
}

function enableNum() {
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].disabled = false;
  }
}

function disableOps() {
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].disabled = true;
  }
}

function enableOps() {
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].disabled = false;
  }
}

clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
