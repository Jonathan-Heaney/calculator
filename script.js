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

clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);

let a = '';
let b = '';
let op = '';
let answer;

for (let i = 0; i < mainButtons.length; i++) {
  mainButtons[i].addEventListener('click', function (e) {
    if (e.target.classList.contains('number-btn') && !op) {
      a += e.target.textContent;
      result.textContent = a;
      backspaceButton.disabled = false;
      if (result.textContent.includes('.')) {
        decimalButton.disabled = true;
      }
    } else if (!op && e.target.classList.contains('operator-btn')) {
      op = e.target.textContent;
      displayText.textContent = `${a} ${op}`;
      decimalButton.disabled = false;
    } else if (
      (a || a === 0) &&
      op &&
      e.target.classList.contains('number-btn')
    ) {
      b += e.target.textContent;
      result.textContent = b;
      backspaceButton.disabled = false;
      if (result.textContent.includes('.')) {
        decimalButton.disabled = true;
      }
    } else if (op && e.target.classList.contains('operator-btn') && !b) {
      op = e.target.textContent;
      decimalButton.disabled = false;
    } else if (op && e.target.classList.contains('operator-btn')) {
      a = Number(a);
      b = Number(b);
      answer = operate(op, a, b);
      if (answer === 'No') {
        alert('Nice try, dum dum');
        clear();
      } else {
        answer = +answer.toFixed(10);
        result.textContent = answer;
        op = e.target.textContent;
        a = answer;
        b = '';
        displayText.textContent = `${a} ${op}`;
        decimalButton.disabled = false;
      }
    } else if ((e.target.id = 'equals')) {
      if (a && b && op) {
        a = Number(a);
        b = Number(b);
        answer = operate(op, a, b);
        if (answer === 'No') {
          alert('Nice try, dum dum');
          clear();
        } else {
          answer = +answer.toFixed(10);
          result.textContent = answer;
          displayText.textContent = `${a} ${op} ${b}`;
          result.textContent = answer;
          decimalButton.disabled = false;
          backspaceButton.disabled = true;
        }
      }
    }
  });
}

function clear() {
  a = '';
  op = '';
  b = '';
  result.textContent = '';
  displayText.textContent = '';
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
