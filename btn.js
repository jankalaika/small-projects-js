// Color changeing button start
const colorbtn = document.getElementById("colorbtn");
const colorDiv = document.querySelector(".container");
let divColours = ["red", "blue", "black", "yellow", "green"];
let btnColours = ["red", "blue", "black", "yellow", "green"];

colorbtn.addEventListener("click", () => {
  let divColourIndex = Math.floor(Math.random() * divColours.length);
  let btnColourIndex = Math.floor(Math.random() * divColours.length);
  colorDiv.style.backgroundColor = divColours[divColourIndex];
  colorbtn.style.backgroundColor = btnColours[btnColourIndex];
});

// Color changeing button end

// Counter start
let count = 0;
let addInput = document.getElementById("addinput");
let addButton = document.getElementById("addbtn");
let withdrawInput = document.getElementById("withdrawinput");
let withdrawButton = document.getElementById("withdrawbtn");
let piggybankTotal = document.querySelector(".total");

addButton.addEventListener("click", () => {
  let addedSum = addInput.value;
  if (isNaN(addedSum) || addedSum <= 0) {
    addInput.value = "";
    return;
  }
  addedSum = parseFloat(addedSum);
  count += addedSum;
  piggybankTotal.textContent = `Piggybank current total is ${count} €`;
  addInput.value = "";
});

withdrawButton.addEventListener("click", () => {
  let withdrawedSum = withdrawInput.value;
  if (isNaN(withdrawedSum) || withdrawedSum <= 0) {
    withdrawInput.value = "";
    return;
  }
  withdrawedSum = parseFloat(withdrawedSum);
  count -= withdrawedSum;
  if (count < 0) {
    alert("There is no money in piggybank to withdraw :(");
    withdrawInput.value = "";
    return;
  }
  piggybankTotal.textContent = `Piggybank current total is ${count} €`;
  withdrawInput.value = "";
});

// Counter end

// Virtual keyboard start
const textArea = document.querySelector("#myTextarea");
const buttons = Array.from(
  document.querySelectorAll(".a ,.backspace ,.caplock ,.enter ,.shift ,.space")
);
const space = document.querySelector(".space");
const capLock = document.querySelector(".caplock");
const shift = document.querySelector(".shift");

buttons.forEach((button) => {
  const buttonId = button.id;
  window[buttonId] = button;
  button.addEventListener("click", () => {
    textArea.focus();
    var cursorPosition = textArea.selectionStart;
    var cursorEndPosition = textArea.selectionEnd;
    if (button.classList.contains("backspace")) {
      if (cursorPosition !== cursorEndPosition) {
        // Remove the selected text from the input value
        textArea.value =
          textArea.value.substring(0, cursorPosition) +
          textArea.value.substring(cursorEndPosition);

        // Set the cursor position to the start of the selection
        textArea.setSelectionRange(cursorPosition, cursorPosition);
      }
      if (cursorPosition > 0) {
        textArea.value =
          textArea.value.substring(0, cursorPosition - 1) +
          textArea.value.substring(cursorPosition);
        textArea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }

      return;
    }
    if (button.classList.contains("caplock")) {
      if (button.classList.contains("capsoff")) {
        button.classList.add("capson");
        button.classList.remove("capsoff");
        button.style.backgroundColor = "rgb(28, 78, 60)";
        return;
      } else {
        button.classList.remove("capson");
        button.classList.add("capsoff");
        button.style.backgroundColor = "rgb(80, 154, 128)";
        return;
      }
    }
    if (button.classList.contains("shift")) {
      if (button.classList.contains("shiftoff")) {
        button.classList.add("shifton");
        button.classList.remove("shiftoff");
        button.style.backgroundColor = "rgb(28, 78, 60)";
      } else {
        button.classList.remove("shifton");
        button.classList.add("shiftoff");
        button.style.backgroundColor = "rgb(80, 154, 128)";
      }
      return;
    }

    if (button.classList.contains("enter")) {
      textArea.value =
        textArea.value.substring(0, cursorPosition) +
        "\n" +
        textArea.value.substring(cursorPosition);
      textArea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      return;
    }
    if (button.classList.contains("space")) {
      textArea.value =
        textArea.value.substring(0, cursorPosition) +
        " " +
        textArea.value.substring(cursorPosition);
      textArea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      return;
    }

    if (
      capLock.classList.contains("capsoff") &&
      shift.classList.contains("shiftoff")
    ) {
      textArea.value += button.innerText.toLowerCase();
    }
    if (
      capLock.classList.contains("capson") ||
      shift.classList.contains("shifton")
    ) {
      textArea.value += button.innerText.toUpperCase();
      shift.classList.remove("shifton");
      shift.classList.add("shiftoff");
      shift.style.backgroundColor = "rgb(80, 154, 128)";
    }
  });
});
