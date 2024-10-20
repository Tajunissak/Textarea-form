const textarea = document.getElementById("convo");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const warning = document.getElementById("warning");
const characterList = document.getElementById("character-letters");
const maxChars = 200;

// Add event listener for the textarea input event
textarea.addEventListener("input", function () {
    // Get the value without counting spaces
    const text = textarea.value.replace(/\s/g, ""); // Removes all spaces from the text
    
    // Check if the character limit is exceeded
    if (text.length > maxChars) {
        alert("Stop Dear No More Character will accept!"); // Show alert
        textarea.value = textarea.value.substring(0, textarea.value.length - 1); // Prevent further input
        return; // Stop further execution
    }

    // Update the unique character count and occurrences
    const charMap = getCharacterOccurrences(text);
    const totalChars = Object.keys(charMap).length; // Total unique characters

   // Update the counter display
counter.textContent = text.length + "/" + maxChars; // Display total character count without spaces

// Update the progress bar width
const progressPercentage = (text.length / maxChars) * 100;
progress.style.width = progressPercentage + "%";

    // Show or hide the warning message if the limit is exceeded
    if (text.length > maxChars) {
        warning.style.display = "block"; // Show the warning
        //warning.textContent = "Character limit exceeded!";
    } else {
        warning.style.display = "none"; // Hide the warning
    }

    // Display the character details (unique characters and occurrences)
    updateCharacterDetails(charMap);
});

// Function to get character occurrences
function getCharacterOccurrences(text) {
    const charMap = {};
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (charMap[char]) {
            charMap[char] += 1; // Increment if already exists
        } else {
            charMap[char] = 1; // Set initial count to 1
        }
    }
    return charMap;
}

// Function to update the character details (unique characters and their occurrences)
function updateCharacterDetails(charMap) {
    // Clear the existing list
    characterList.innerHTML = "";

    // Loop through each unique character and create list items
    for (const char in charMap) {
        const listItem = document.createElement("li");
        listItem.textContent = `Character "${char}": ${charMap[char]} times`;
        characterList.appendChild(listItem);
    }
}
