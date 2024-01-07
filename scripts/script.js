/**
 * Validates the selected gender checkboxes.
 * @returns {boolean} - True if the gender is valid, false otherwise.
 */
function validateGender() {
    if(!isMale && !isFemale && !predicted) {
        error.innerText = "Please provide gender!";
        return false;
    }
    if(isMale && isFemale) {
        error.innerText = "Gender cannot be both male and female!";
        return false;
    }
    error.innerText = ""
    return true;
}

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

    error.innerText = "";
    return true;
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
        predicted = data['gender']
        dispalayPrediction(data);

    } catch (error) {
        error.innerText = 'Fetch error: ' + error;
    }
    return null
}

/**
 * Function to handle form submission.
 * Retrieves the entered name, validates it, and initiates the process to fetch the predicted answer.
 */
function handelSubmit() {
    const nameValue = enteredName.value.trim();
    if (validateName(nameValue)) {
        fetchPredictedAnswer(nameValue);
        displaySavedAnswer(nameValue)
    }
}

function displaySavedAnswer(name) {
    let gender = getLocalStorage(name);

    if (gender) {
        savedAnswer.innerText = `${name} was saved as ${gender}`;
    } else {
        savedAnswer.innerText = `${name} has no saved gender information.`;
    }
}

function saveLocalStorage(name, gender) {
    localStorage.setItem(name, gender);
}

function getLocalStorage(name) {
    return localStorage.getItem(name)
}

function handelSave() {
    const nameValue = enteredName.value.trim();
    if(validateName(nameValue) && validateGender()){
        let gender = isMale ? "male" : isFemale ? "female" : predicted;    
        saveLocalStorage(nameValue, gender);
        displaySavedAnswer(nameValue);
    }
}

function handelClear() {
    
}


function handleCheckboxChange(checkbox) {
    if (checkbox.id === "male") {
        isMale = checkbox.checked;
    } else if (checkbox.id === "female") {
        isFemale = checkbox.checked;
    }
}

// Event listener values
let isMale = false
let isFemale = false

let predicted = ""

// Document elements
const error = document.getElementById("error")
const enteredName = document.getElementById("enteredName")
const predictedAnswer = document.getElementById("predicted-answer")
const savedAnswer = document.getElementById("seved-answer")

// Data saved in localstorage
const savedData = ""
