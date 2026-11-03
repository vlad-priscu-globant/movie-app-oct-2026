// State
let count = 0;

// DOM Elements
const displayElement = document.getElementById('count-display');
const btnIncrement = document.getElementById('btn-increment');
const btnDecrement = document.getElementById('btn-decrement');
const warningMessage = document.getElementById('warning-message');

// Functions to update State & DOM
function updateUI() {
    // 1. Update the display text
    displayElement.textContent = count;
    
    // 2. Add some logic that would easily become spaghetti if the app was larger
    if (count < 0) {
        warningMessage.textContent = "Warning: Count is negative!";
        displayElement.style.color = "red";
    } else {
        warningMessage.textContent = "";
        displayElement.style.color = "#333";
    }
}

// Event Listeners (Imperative DOM manipulation triggers)
btnIncrement.addEventListener('click', () => {
    count++;
    updateUI();
});

btnDecrement.addEventListener('click', () => {
    count--;
    updateUI();
});

// Initial Render
updateUI();
