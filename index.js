const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

const plans = [
    { id: 1, planName: "Platinum365", planCost: 499, planValidity: 365, planStatus: 1 },
    { id: 2, planName: "Gold180", planCost: 299, planValidity: 180, planStatus: 1 },
    { id: 3, planName: "Silver90", planCost: 199, planValidity: 90, planStatus: 1 }
];

let customerData = [];

app.get('/plans', (req, res) => {
    res.json(plans);
});

app.post('/addcustomer', (req, res) => {
    const newCustomer = req.body;
    let isExiting = customerData.filter((c) => c.mobile_number === newCustomer.mobile_number).length > 0;
    customerData = customerData.map(c => {
        if (c.mobile_number === newCustomer.mobile_number) {
            return newCustomer;
        }
        return c;
    });
    if (!isExiting) {
        customerData.push(newCustomer); // Append new customer data
        console.log('New customer added:', newCustomer);
    } else {
        console.log('New customer updated:', newCustomer);
    }
    
    if (customerData.length > 0) {
        //console.log('Customer data:', customerData);
        res.json(customerData);
    } else {
        res.json([]);
    }
});

app.get('/customer', (req, res) => {
    if (customerData.length > 0) {
        //console.log('Customer data:', customerData);
        res.json(customerData);
    } else {
        res.json([]);
    }
});

// Start the server
const port = 3001; // Change port to 3000 for consistency with previous examples
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});