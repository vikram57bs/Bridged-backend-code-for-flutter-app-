const express = require('express');
const router = express.Router();
const { schemaDef, conschema } = require('./schema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Function to check credentials
const dbURI=process.env.dbURI;
const secretKey=process.env.secretKey;
const MyFirstPripo = mongoose.model('MyFirstPripo', schemaDef);
const MyconPripo = mongoose.model('MyconPripo', conschema);
async function checkcred(data) {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Define the models
        

        // Check in MyFirstPripo collection
        const firstPripoResult = await MyFirstPripo.findOne({ mobile_number: data.mobile_number, password: data.password });
        if (firstPripoResult) {
            return { exists: true, collection: 'MyFirstPripo', data: firstPripoResult };
        }

        // Check in MyconPripo collection
        const conPripoResult = await MyconPripo.findOne({ mobile_number: data.mobile_number, password: data.password });
        if (conPripoResult) {
            return { exists: true, collection: 'MyconPripo', data: conPripoResult };
        }

        // If no match is found
        return { exists: false };
    } catch (err) {
        console.error(err);
        return { error: err.message };
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
}

// Route to handle login
router.post('/login', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const cred = req.body;
    const result = await checkcred(cred);

    if (result.error) {
        res.status(500).send(result.error);
    } else if (result.exists) {
        if (result.collection == "MyFirstPripo") {
            const user = { mobile: result["data"].mobile_number, role: "worker" };
            const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
            res.status(200).send({token});
        }else{
            const user = { mobile: result["data"].mobile_number, role: "contractor" };
            const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
            res.status(200).send({token});
        }
        
       
    } else {
        res.status(404).send('Credentials not found');
    }
});

module.exports = router;
