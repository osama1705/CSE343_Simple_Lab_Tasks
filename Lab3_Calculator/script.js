// LAB 3 - SIMPLE CALCULATOR
// Think of the code as: 1) read a button, 2) do some logic, 3) update the page.

// DOM: find the elements we want to use.
const display = document.getElementById("display");
const keys = document.getElementById("keys");

// These variables remember what the user is calculating.
let currentNumber = "0";
let savedNumber = null;
let operation = null;
let newNumber = false;

// Show the current number on the webpage.
function updateDisplay() {
  display.textContent = currentNumber;
}

// Called when the user presses a number or decimal point.
function typeNumber(value) {
  if (newNumber || currentNumber === "Error") {
    currentNumber = value === "." ? "0." : value;
    newNumber = false;
  } else if (value === ".") {
    // Don't allow a number to contain two decimal points.
    if (!currentNumber.includes(".")) currentNumber += ".";
  } else {
    currentNumber = currentNumber === "0" ? value : currentNumber + value;
  }
  updateDisplay();
}

// Pure logic: do the requested mathematical operation.
function calculate(a, b, symbol) {
  if (symbol === "+") return a + b;
  if (symbol === "-") return a - b;
  if (symbol === "*") return a * b;
  if (symbol === "/") return b === 0 ? null : a / b;
}

// Save the first number and which operation was selected.
function chooseOperation(symbol) {
  if (currentNumber === "Error") return;

  // Support calculations like 2 + 3 + 4.
  if (operation !== null && !newNumber) {
    showResult();
    if (currentNumber === "Error") return;
  }

  savedNumber = Number(currentNumber);
  operation = symbol;
  newNumber = true;
}

function showResult() {
  if (savedNumber === null || operation === null) return;

  const answer = calculate(savedNumber, Number(currentNumber), operation);
  // Convert null (division by zero) into a friendly error message.
  currentNumber = answer === null ? "Error" : String(Number(answer.toFixed(10)));
  savedNumber = null;
  operation = null;
  newNumber = true;
  updateDisplay();
}

function clearCalculator() {
  currentNumber = "0";
  savedNumber = null;
  operation = null;
  newNumber = false;
  updateDisplay();
}

function backspace() {
  if (newNumber || currentNumber === "Error") return;
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === "" || currentNumber === "-") currentNumber = "0";
  updateDisplay();
}

// EVENT: one listener handles all the buttons (event delegation).
keys.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    typeNumber(button.dataset.number);
  } else if (button.dataset.operator) {
    chooseOperation(button.dataset.operator);
  } else if (button.dataset.action === "equals") {
    showResult();
  } else if (button.dataset.action === "clear") {
    clearCalculator();
  } else if (button.dataset.action === "backspace") {
    backspace();
  } else if (button.dataset.action === "percent" && currentNumber !== "Error") {
    currentNumber = String(Number(currentNumber) / 100);
    updateDisplay();
  }
});
