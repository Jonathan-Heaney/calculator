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
  } else if (op === '*') {
    return multiply(a, b);
  } else if (op === '/') {
    return divide(a, b);
  }
}

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', function (e) {
    let displayValue = e.target.textContent;
    console.log(displayValue);
    display.textContent = `${displayValue}`;
  });
}
