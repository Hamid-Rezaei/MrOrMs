/**
 * Validates the provided name.
 * @param {string} name - The name to be validated.
 * @returns {boolean} - True if the name is valid, false otherwise.
 */
function validateName(name) {
    if (!name) {
        error.innerText = "Please provide name!";
        return false;
    }

    if (name.length > 255) {
        error.innerText = "Name length exceeds 255 characters.";
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        error.innerText ="Name should contain only letters (uppercase and lowercase) and spaces.";
        return false;
    }

    return true;
}

function dispalaySavedAnswer(){

}

/**
 * Displays the prediction information on the webpage.
 * @param {Object} prediction - The prediction object containing name, gender, and probability.
 */
function dispalayPrediction({gender, probability}){
    if(!gender){
        let msg = "There's not any prediction";
        error.innerText = msg; 
        predictedAnswer.innerText = msg; 
    } else {
        predictedAnswer.innerText = `gender: ${gender}\n\nprob: ${probability}`
    }
}

/**
 * Asynchronous function to fetch predicted gender based on the provided name.
 * @param {string} nameValue - The name to be used for gender prediction.
 */
async function fetchPredictedAnswer(nameValue) {
    const apiUrl = `https://api.genderize.io/?name=${nameValue}`;

    try {
        const response = await fetch(apiUrl, { method: "GET" });

        if (!response.ok) {
            error.innerText = "Network response was not ok";
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        dispalayPrediction(data);

    } catch (error) {
        error.innerText = 'Fetch error: ' + error;
    }
}

/**
 * Function to handle form submission.
 * Retrieves the entered name, validates it, and initiates the process to fetch the predicted answer.
 */
function handelSubmit() {
    const nameValue = enteredName.value.trim();
    if (validateName(nameValue)) {
        error.innerText = "";
        fetchPredictedAnswer(nameValue);
    }
}

function handelSave() {
    savedData.gender = gender;
    savedData.probability = probability

    const nameValue = enteredName.value.trim();
    localStorage.setItem(nameValue, savedData);
}

function handelClear() {
    
}




// Document elements
const error = document.getElementById("error")
const enteredName = document.getElementById("enteredName")
const isMale = document.getElementById("male")
const isFemale = document.getElementById("female")
const predictedAnswer = document.getElementById("predicted-answer")
const savedAnswer = document.getElementById("saved-answer")

// Data saved in localstorage
const savedData = {gender: ""}
