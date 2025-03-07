// get all elements from the form
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

/* pattern which matches the following number formats:  
- 1 555-555-5555
- 1 (555) 555-5555
- 1(555)555-5555
- 1 555 555 5555
- 5555555555
- 555-555-5555
- (555)555-5555
*/
const pattern = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

// function to check if the input is a valid US number
function checkValidPhoneNumber(phoneNumber) {

    // removing any non-numeric characters from the input
    // to get a clean number for additional checks
    const clean = phoneNumber.replace(/[^0-9]/g, '');

    // clean string must be number, otherwise invalid
    if (isNaN(clean)) {
        return false;
    }

    // cleaned number must be 10 or 11 digits long, otherwise invalid
    if (clean.length !== 10 && clean.length !== 11) {
        return false;
    }

    // if clean number is 11 digits
    // it must have leading country code '1', otherwise invalid
    if (clean.length === 11 && clean[0] !== '1') {
        return false;
    }

    // finally check pattern match
    return pattern.test(phoneNumber);
}

// define a function to append a message to existing resultsDiv
// taking param of valid or invalid phone number
function showResult(isEmpty, phoneNumber, isValidNumber) {
    if (isEmpty){
        resultsDiv.textContent = 'Please provide a phone number!';
        resultsDiv.className = 'invalid';
        return;
    }

    resultsDiv.textContent = isValidNumber
        ? `Valid US number: ${phoneNumber}`
        : `Invalid US number: ${phoneNumber}`;

        resultsDiv.className = isValidNumber ? 'valid' : 'invalid';

}

// add an event listener for when the user clicks the button
checkBtn.addEventListener('click', function () {

    // get the input value
    const phoneNumber = userInput.value;

    // check if the input is empty, then show alert, no need to check further
    if (phoneNumber === '') {
        // append the error message in the output element
        showResult(true, null, null)
        alert('Please provide a phone number');
        return;
    }

    const isValidNumber = checkValidPhoneNumber(phoneNumber);

    // append the error message in the output element
    showResult(false, phoneNumber, isValidNumber)
});

// add an event listener for when the user clicks the button
clearBtn.addEventListener('click', function () {
    userInput.value = '';
    resultsDiv.textContent = '';
});