const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanNumerals = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" },
];

const convertToRoman = (num) => {
  let roman = "";

  // Loop through each numeral, starting with the largest
  for (let i = 0; i < romanNumerals.length; i++) {
    // While the number is greater than or equal to the value
    while (num >= romanNumerals[i].value) {
      // Append the numeral to the result string
      roman += romanNumerals[i].numeral;
      // Subtract the value from the number
      num -= romanNumerals[i].value;
    }
  }

  return roman;
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    output.innerHTML = "Please enter a valid number";
    output.classList.add("alert");
    output.style.display = "block";
    return;
  }

  if (inputInt < 1) {
    output.innerHTML = "Please enter a number greater than or equal to 1";
    output.classList.add("alert");
    output.style.display = "block";
    return;
  }

  if (inputInt > 3999) {
    output.innerHTML = "Please enter a number less than or equal to 3999";
    output.classList.add("alert");
    output.style.display = "block";
    return;
  }

  output.innerHTML = convertToRoman(inputInt);
  output.classList.remove("alert");
  output.style.display = "block";
};

// Handle onclick event of convert button
convertButton.addEventListener("click", checkUserInput);

// Handle enter key press
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
