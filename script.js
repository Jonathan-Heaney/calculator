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
    return divide(a, b);
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

// for (let i = 0; i < operatorButtons.length; i++) {
//   operatorButtons[i].addEventListener('click', showDisplay);
// }

// for (let i = 0; i < numberButtons.length; i++) {
//   numberButtons[i].addEventListener('click', showDisplay);
// }

// function showDisplay(e) {
//   let displayValue = e.target.textContent;
//   displayText.textContent += `${displayValue}`;
// }

clearButton.addEventListener('click', clear);

let a = '';
let b = '';
let op = '';
let answer;

for (let i = 0; i < mainButtons.length; i++) {
  mainButtons[i].addEventListener('click', function (e) {
    if (e.target.classList.contains('number-btn') && !op) {
      a += e.target.textContent;
      result.textContent = a;
      console.log(`a = ${a}`);
    } else if (!op && e.target.classList.contains('operator-btn')) {
      op = e.target.textContent;
      displayText.textContent = `${a} ${op}`;
      console.log(`op = ${op}`);
    } else if (a && op && e.target.classList.contains('number-btn')) {
      b += e.target.textContent;
      result.textContent = b;
      console.log(`b = ${b}`);
    } else if (op && e.target.classList.contains('operator-btn') && !b) {
      op = e.target.textContent;
    } else if (op && e.target.classList.contains('operator-btn')) {
      a = Number(a);
      b = Number(b);
      console.log(operate(op, a, b));
      answer = operate(op, a, b);
      result.textContent = answer;
      op = e.target.textContent;
      a = answer;
      b = '';
      displayText.textContent = `${a} ${op}`;
      console.log(`a = ${a}`);
      console.log(`b = ${b}`);
      console.log(`answer = ${answer}`);
    } else if ((e.target.id = 'equals')) {
      if (a && b && op) {
        a = Number(a);
        b = Number(b);
        answer = operate(op, a, b);
        console.log(operate(op, a, b));
        displayText.textContent = `${a} ${op} ${b}`;
        result.textContent = answer;
      }
    }
  });
}

function clear(e) {
  a = '';
  op = '';
  b = '';
  result.textContent = '';
  displayText.textContent = '';
}
