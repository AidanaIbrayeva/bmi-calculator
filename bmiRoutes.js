const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

router.use(bodyParser.json());

function calculateBMI(height, weight) {
    const bmi = weight / (height * height * 0.0001);

    let category;

    if (bmi < 18.5) {
        category = 'Дефецит массы тела';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Норма';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Избыточная масса тела (повышенная)';
    } else if (bmi >= 30 && bmi <= 34.9) {
        category = 'Ожирение (1 степень)';
    } else if (bmi >= 35) {
        category = 'Ожирение (2 степень и выше)';
    }

    return { bmi, category };
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'bmiCalculator.html'));
});

router.post('/bmicalculator', (req, res) => {
    const { height, weight } = req.body;

    if (!height || !weight) {
        return res.status(400).send('Height and weight are required');
    }

    const bmiResult = calculateBMI(parseFloat(height), parseFloat(weight));

    res.json(bmiResult);
});
router.post('/bmicalculator', (req, res) => {
    const { height, weight } = req.body;

    if (!height || !weight) {
        return res.status(400).send('Height and weight are required');
    }

    const bmiResult = calculateBMI(parseFloat(height), parseFloat(weight));

    res.json(bmiResult);
});
router.get('/bmihistory', (req, res) => {
    res.send('BMI Calculation History');
});

module.exports = router;
