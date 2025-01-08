// check button
const checkButton = document.getElementById("check-btn");
checkButton.addEventListener("click", () => {
  const textInput = document.getElementById("text-input");
  const resultText = document.getElementById("result");

  // get user input
  const input = textInput.value;

  // handle empty input
  if (!input) {
    alert("Please input a value");
    return;
  }

  // remove non-alphanumeric characters and convert to lowercase
  const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // palindrome:  compare original with it's reverse
  // reversing: split to an array, reverse, and join
  const isPalindrome =
    cleanedInput === cleanedInput.split("").reverse().join("");

  // display the result
  if (isPalindrome) {
    resultText.textContent = `${input} is a palindrome`;
  } else {
    resultText.textContent = `${input} is not a palindrome`;
  }
});
