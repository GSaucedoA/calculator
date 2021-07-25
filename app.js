function add(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a + b;
}
function subtract(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a - b;
}
function multiply(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a * b;
}
function divide(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a / b;
}
function setDisplay(message) {
  if (message == "NaN" || getDisplay() == "Infinity") message = 0;
  displayScreen.textContent = message;
  dot();
}
function getDisplay() {
  return displayScreen.textContent.trim();
}
function operate(userInput) {
  const display = getDisplay();
  const multiplyV = display.split("x");
  const addV = display.split("+");
  const divideV = display.split("/");
  const subtractV = display.split("-");

  const sign =
    multiplyV.length > 1
      ? "x"
      : addV.length > 1
      ? "+"
      : divideV.length > 1
      ? "/"
      : subtractV.length > 1
      ? "-"
      : "";
  let result = 0;

  switch (sign) {
    case "+":
      result = add(addV[0], addV[1]);
      break;
    case "-":
      result = subtract(subtractV[0], subtractV[1]);
      break;
    case "/":
      result = divide(divideV[0], divideV[1]);
      break;
    case "x":
      result = multiply(multiplyV[0], multiplyV[1]);
      break;
  }
  if (!Number.isInteger(result)) result = result.toFixed(6);
  equalsInput ? setDisplay(result) : setDisplay(result + userInput);
}

function reset() {
  setDisplay("0");
  equalsInput = false;
}

function hasSign() {
  const display = getDisplay();
  const multiply = display.split("x").length;
  const add = display.split("+").length;
  const divide = display.split("/").length;
  const subtract = display.split("-").length;

  return multiply > 1 || add > 1 || subtract > 1 || divide > 1 ? true : false;
}

function dot() {
  const dotButton = document.querySelector(".dot");
  if (getDisplay().includes(".")) {
    dotButton.disabled = true;
    dotButton.classList.add("disabled");
  } else {
    dotButton.disabled = false;
    dotButton.classList.remove("disabled");
  }
}

/*Inicio variables globales*/
const displayScreen = document.querySelector(".calculator__result");
const calculatorBody = document.querySelector(".calculator__body");

const names = [
  ".one",
  ".two",
  ".three",
  ".four",
  ".five",
  ".six",
  ".seven",
  ".eight",
  ".nine",
  ".zero",
  ".divide",
  ".multiply",
  ".subtract",
  ".add",
  ".equals",
  ".dot",
];

const signs = ["-", "+", "/", "x"];

const buttons = [];
names.forEach((name) => {
  buttons.push(document.querySelector(name));
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  if (window.confirm("¿Seguro que desea eliminar todo?")) reset();
});

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => {
  if (getDisplay() != 0 && getDisplay() != "Infinity") {
    const display = getDisplay();
    if (display.length - 1 == 0) {
      setDisplay(0);
    } else {
      setDisplay(display.substring(0, display.length - 1));
    }
  }
});

let equalsInput = false;
/*Fin variables globales */

buttons.forEach((button) => {
  /*
  Equals button
  */
  if (button.textContent.trim() == "=") {
    button.addEventListener("click", function () {
      equalsInput = true;
      operate(this);
    });
    return;
  }
  button.addEventListener("click", function () {
    const textoDisplay = getDisplay();
    const textoInput = this.textContent.trim();

    /*
    Comprueba si el valor inicial es cero 
    para reemplazarlo en lugar de concatenar
    */
    if (textoDisplay == "0") {
      setDisplay(textoInput);
      return;
    }

    /*Comprueba si el ultimo valor del display es un signo*/
    const signed = signs.indexOf(textoDisplay[textoDisplay.length - 1]);

    /*Si el ultimo valor del display es un signo y ademas
    el valor del input tambien lo es 
    se lo hace saber al usuario*/
    if (signed >= 0 && signs.includes(textoInput)) {
      alert("You must type a number");
      return;
    }

    /*Si el input es un signo comprueba si el display
     ya tiene un signo para hacer primero esa operacion*/
    if (signs.includes(textoInput)) {
      if (hasSign()) {
        equalsInput = false;
        operate(textoInput);
        return;
      }
    }
    setDisplay(getDisplay() + textoInput);
  });
});
