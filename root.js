const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const bmiRoutesModule = require('./routes/bmiRoutes');
app.use('/', bmiRoutesModule);

app.get('/', (req, res) => {
    res.redirect('/bmiCalculator.html');
});

function calculateBMI(height, weight) {
    fetch('/bmicalculator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ height, weight }),
    })
    .then(response => response.json())
    .then(result => displayResult(result))  // Заменяем alert на displayResult
    .catch(error => {
        console.error('Error:', error);
        displayError('Error calculating BMI. Please try again.');
    });
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `BMI Result: ${result.bmi}`;
    resultElement.style.color = '#28a745'; // Зеленый цвет для результата

    const categoryElement = document.getElementById('category');
    categoryElement.innerHTML = `Category: ${result.category}`;
    categoryElement.style.color = '#17a2b8'; // Синий цвет для категории

    clearError();
}

function displayError(errorMessage) {
    const errorElement = document.getElementById('error');
    errorElement.innerHTML = errorMessage;
    errorElement.style.color = '#dc3545'; // Red color for error

    clearResult();
    clearCategory();
}

function clearResult() {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
}

function clearCategory() {
    const categoryElement = document.getElementById('category');
    categoryElement.innerHTML = '';
}

function sendBMIRequest(height, weight) {
    fetch('/bmicalculator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ height, weight }),
    })
    .then(response => response.json())
    .then(result => displayResult(result))
    .catch(error => {
        console.error('Error:', error);
        displayError('Error calculating BMI. Please try again.');
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port} http://localhost:3000`);
});
