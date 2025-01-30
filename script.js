document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "";
  let operator = null;
  let firstOperand = null;
  let memory = 0; // Memory for M+, M-, MR, MC

  const updateDisplay = () => {
    display.textContent = currentInput || "0";
  };

  document.querySelector(".buttons").addEventListener("click", (e) => {
    const value = e.target.textContent;

    // Clear
    if (e.target.id === "clear") {
      currentInput = "";
      operator = null;
      firstOperand = null;
      updateDisplay();
    }
    // Memory Functions
    else if (e.target.id === "mc") {
      memory = 0;
    } else if (e.target.id === "mr") {
      currentInput = memory.toString();
      updateDisplay();
    } else if (e.target.id === "mplus") {
      memory += parseFloat(currentInput) || 0;
    } else if (e.target.id === "mminus") {
      memory -= parseFloat(currentInput) || 0;
    }
    // Operators
    else if (e.target.classList.contains("operator")) {
      if (e.target.id === "sqrt") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
      } else if (e.target.id === "percentage") {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
      } else {
        // Handle normal operators
        if (currentInput) {
          firstOperand = parseFloat(currentInput);
          operator = value;
          currentInput = "";
        }
      }
    }
    // Equals
    else if (e.target.id === "equals") {
      if (firstOperand !== null && operator && currentInput) {
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
          case "+":
            currentInput = (firstOperand + secondOperand).toString();
            break;
          case "−":
            currentInput = (firstOperand - secondOperand).toString();
            break;
          case "×":
            currentInput = (firstOperand * secondOperand).toString();
            break;
          case "÷":
            currentInput = secondOperand !== 0 ? (firstOperand / secondOperand).toString() : "Error";
            break;
        }
        operator = null;
        firstOperand = null;
        updateDisplay();
      }
    }
    // Handle numbers and decimal point
    else {
      currentInput += value;
      updateDisplay();
    }
  });
});
