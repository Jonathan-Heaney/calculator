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

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', function (e) {
    let displayValue = e.target.textContent;
    displayText.textContent += `${displayValue}`;
  });
}

let a = '';
let b = '';
let op = '';

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function (e) {
    if (e.target.classList.contains('number-btn') && !op) {
      a += e.target.textContent;
      console.log(`a = ${a}`);
    } else if (!op && e.target.classList.contains('operator-btn')) {
      op = e.target.textContent;
      console.log(`op = ${op}`);
    } else if (a && op && e.target.classList.contains('number-btn')) {
      b += e.target.textContent;
      console.log(`b = ${b}`);
    } else if (op && e.target.classList.contains('operator-btn')) {
      a = Number(a);
      b = Number(b);
      console.log(operate(op, a, b));
    }
  });
}
