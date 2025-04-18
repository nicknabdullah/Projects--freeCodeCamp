// Price of the item being purchased
const price = 19.5;

// Cash-in-drawer (cid): available denominations and their total amount
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

// Value of each denomination
const unitValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
};

// Show price on screen
document.getElementById("price").textContent = `Total: $${price.toFixed(2)}`;

// Display current drawer state
updateDrawerDisplay();

// Button click for Purchase button
document.getElementById("purchase-btn").addEventListener("click", function () {
    const cashInput = document.getElementById("cash").value;
    const customerCash = parseFloat(cashInput);
    const changeDueDisplay = document.getElementById("change-due");

    // Validate user input
    if (isNaN(customerCash)) {
        alert("Please enter a valid cash amount.");
        return;
    }

    // If customer gives less cash than the price
    if (customerCash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    const requiredChange = parseFloat((customerCash - price).toFixed(2));

    // If customer pays exact amount
    if (requiredChange === 0) {
        updateChangeDue(changeDueDisplay, "No change due - customer paid with exact cash", []);
        return;
    }

    calculateChange(requiredChange, changeDueDisplay);
});

function calculateChange(requiredChange, changeDueDisplay) {
    // Prepare to calculate change
    let changeToReturn = []; // will hold the denominations and amounts we give back
    let remainingChange = requiredChange;

    // Make a deep copy of the cid array so we can update it only if transaction is successful
    let updatedCid = [];
    for (let i = 0; i < cid.length; i++) {
        updatedCid.push([cid[i][0], cid[i][1]]);
    }

    // Go through denominations from largest to smallest
    for (let i = cid.length - 1; i >= 0; i--) {
        const denomName = cid[i][0];
        const denomUnitValue = unitValues[denomName];
        let denomTotalAvailable = cid[i][1];
        let denomUsed = 0;

        // While we still need this denomination and it’s available in drawer
        while (remainingChange >= denomUnitValue && denomTotalAvailable >= denomUnitValue) {
            // Subtract denomination value from remaining change
            remainingChange -= denomUnitValue;

            // Subtract denomination value from the available amount in the drawer
            denomTotalAvailable -= denomUnitValue;

            // Add the denomination value to the total amount of that denomination used
            denomUsed += denomUnitValue;

            // Round the values inside the loop to avoid floating point issues
            remainingChange = parseFloat(remainingChange.toFixed(2));
            denomTotalAvailable = parseFloat(denomTotalAvailable.toFixed(2));
            denomUsed = parseFloat(denomUsed.toFixed(2));
        }

        // If we used this denomination, push it to the return change array
        if (denomUsed > 0) {
            changeToReturn.push([denomName, denomUsed]);
            updatedCid[i][1] = denomTotalAvailable; // Update drawer
        }
    }

    // Calculate total cash in drawer before transaction using reduce
    let totalDrawerBefore = cid.reduce((total, denom) => total + denom[1], 0);
    totalDrawerBefore = parseFloat(totalDrawerBefore.toFixed(2));

    // Calculate total change we are giving back using reduce
    let totalChangeGiven = changeToReturn.reduce((total, change) => total + change[1], 0);
    totalChangeGiven = parseFloat(totalChangeGiven.toFixed(2));

    // If we couldn’t give full change
    if (totalChangeGiven < requiredChange) {
        updateChangeDue(changeDueDisplay, "Status: INSUFFICIENT_FUNDS", []);
        return;
    }

    // If we're giving all cash left in the drawer (drawer should now be empty)
    if (requiredChange === totalDrawerBefore) {
        cid = updatedCid; // Update the global drawer
        updateDrawerDisplay();

        updateChangeDue(changeDueDisplay, "Status: CLOSED", changeToReturn);
        return;
    }

    // Normal case: drawer still has money left after giving change
    cid = updatedCid;
    updateDrawerDisplay();

    updateChangeDue(changeDueDisplay, "Status: OPEN", changeToReturn);
}

// Update each drawer element on screen
function updateDrawerDisplay() {
    for (let i = 0; i < cid.length; i++) {
        const denomName = cid[i][0];
        const amount = cid[i][1];
        const drawerElement = document.getElementById(denomName);

        if (drawerElement) {
            drawerElement.textContent = `${capitalize(denomName)}: $${amount.toFixed(2)}`;
        }
    }
}

// Converts enum-like names to readable plural forms
function capitalize(denomName) {
    const pluralMap = {
        "PENNY": "Pennies",
        "NICKEL": "Nickels",
        "DIME": "Dimes",
        "QUARTER": "Quarters",
        "ONE": "Ones",
        "FIVE": "Fives",
        "TEN": "Tens",
        "TWENTY": "Twenties",
        "ONE HUNDRED": "Hundreds"
    };

    return pluralMap[denomName] || denomName;
}

// Function to display status and change due
function updateChangeDue(displayElement, status, change) {
    let changeText = `${status}<br>`;
    for (let i = 0; i < change.length; i++) {
        changeText += `${change[i][0]}: $${change[i][1]}<br>`;
    }

    displayElement.innerHTML = changeText.trim();
}