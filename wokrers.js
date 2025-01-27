const express = require('express')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });
const jwt = require('jsonwebtoken');
const { schemaDef ,conschema} = require('./schema');
require('dotenv').config();

const secretKey = process.env.secretKey;
const mongoose = require('mongoose');

const dbURI = process.env.dbURI;
const MyFirstPripo =  mongoose.model('MyFirstPripo', schemaDef);
const MyconPripo =  mongoose.model('MyconPripo', conschema);
async function conn(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await MyFirstPripo.create(data);
    const user = { mobile: data["mobile_number"], role: "worker" };
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    return { "result": "suc", "token": token };

  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connfpfp(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    if (data["type"] == "create") {
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $push: { "favourites": { "reference_number": data["reference_number"] } } });
    } else {
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $pull: { "favourites": { "reference_number": data["reference_number"] } } });
    }
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function changelanguage(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Define the models
    

    // Check if the mobile number exists in MyFirstPripo
    const firstPripoRecord = await MyFirstPripo.findOne({ "mobile_number": data["mobile_number"] });

    if (firstPripoRecord) {
      // Update the language in MyFirstPripo
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "language": data["language"] } });
      return 'yes';
    } else {
      // Check if the mobile number exists in MyconPripo
      const conPripoRecord = await MyconPripo.findOne({ "mobile_number": data["mobile_number"] });

      if (conPripoRecord) {
        // Update the language in MyconPripo
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "language": data["language"] } });
        return 'yes';
      } else {
        // Mobile number not found in either collection
        return 'Mobile number not found in any collection';
      }
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
}

async function changeaddress(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Define the models
    

    // Check if the mobile number exists in MyFirstPripo
    const firstPripoRecord = await MyFirstPripo.findOne({ "mobile_number": data["mobile_number"] });

    if (firstPripoRecord) {
      // Update the language in MyFirstPripo
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "address": data["address"] } });
      return 'yes';
    } else {
      // Check if the mobile number exists in MyconPripo
      const conPripoRecord = await MyconPripo.findOne({ "mobile_number": data["mobile_number"] });

      if (conPripoRecord) {
        // Update the language in MyconPripo
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "address": data["address"] } });
        return 'yes';
      } else {
        // Mobile number not found in either collection
        return 'Mobile number not found in any collection';
      }
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
}
async function changepassword(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Define the models
  

    // Check if the mobile number exists in MyFirstPripo
    const firstPripoRecord = await MyFirstPripo.findOne({ "mobile_number": data["mobile_number"] });

    if (firstPripoRecord) {
      // Update the language in MyFirstPripo
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "password": data["password"] } });
      return 'yes';
    } else {
      // Check if the mobile number exists in MyconPripo
      const conPripoRecord = await MyconPripo.findOne({ "mobile_number": data["mobile_number"] });

      if (conPripoRecord) {
        // Update the language in MyconPripo
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "password": data["password"] } });
        return 'yes';
      } else {
        // Mobile number not found in either collection
        return 'Mobile number not found in any collection';
      }
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
}
async function changecity(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Define the models
    

    // Check if the mobile number exists in MyFirstPripo
    const firstPripoRecord = await MyFirstPripo.findOne({ "mobile_number": data["mobile_number"] });

    if (firstPripoRecord) {
      // Update the language in MyFirstPripo
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "city": data["city"] } });
      return 'yes';
    } else {
      // Check if the mobile number exists in MyconPripo
      const conPripoRecord = await MyconPripo.findOne({ "mobile_number": data["mobile_number"] });

      if (conPripoRecord) {
        // Update the language in MyconPripo
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "city": data["city"] } });
        return 'yes';
      } else {
        // Mobile number not found in either collection
        return 'Mobile number not found in any collection';
      }
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
}
async function changenumber(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Define the models
    

    // Check if the mobile number exists in MyFirstPripo
    const firstPripoRecord = await MyFirstPripo.findOne({ "mobile_number": data["mobile_number"] });

    if (firstPripoRecord) {
      // Update the language in MyFirstPripo
      await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "mobile_number": data["mobile_number"] } });
      return 'yes';
    } else {
      // Check if the mobile number exists in MyconPripo
      const conPripoRecord = await MyconPripo.findOne({ "mobile_number": data["mobile_number"] });

      if (conPripoRecord) {
        // Update the language in MyconPripo
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $set: { "mobile_number": data["mobile_number"] } });
        return 'yes';
      } else {
        // Mobile number not found in either collection
        return 'Mobile number not found in any collection';
      }
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
}



async function conntallr() {
  //const n = "7305621554";
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
   
    const dat = await MyFirstPripo.find();
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntallff() {
  //const n = "7305621554";
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dat = await MyFirstPripo.find({ "mobile_number": 7907666366 });
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connfmp(data) {
  try {
    const arrl = data["members"];
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dat = await MyFirstPripo.find({ "mobile_number": { $in: arrl } });
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}

async function conntffpr(n) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dat = await MyFirstPripo.find({ "mobile_number": n }, { "favourites": 1, "_id": 0 });
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}


router.post('/postuserdata', upload.single('identity_proof'), async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  console.log("received file :", req.file);

  const data = req.body;
  if (req.file) {
    data.identity_proof = {
      "filename": req.file.originalname,
      "file": req.file.buffer,
      "uploaded_at": new Date()
    };
  }

  const ans = await conn(data);

  if (ans["result"] === 'suc') {
    const token = ans["token"];
    res.status(201).send({ token });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.post('/createfavourite', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const data = req.body;
  const ans = await connfpfp(data);

  if (ans === 'yes') {
    res.status(201).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.post('/getallmembers', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await connfmp(data);

  if (Array.isArray(ans)) {
    res.status(201).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();
});
router.put('/changelanguage', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await changelanguage(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.put('/changeaddress', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await changeaddress(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.put('/changepassword', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await changepassword(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.put('/changecity', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await changecity(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.put('/changenumber', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await changenumber(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.get('/allusers', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const ans = await conntallr();
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

});
router.get('/mydata', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const ans = await conntallff();
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

});
router.post('/favgroups', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await conntffpr(data["mobile_number"]);
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

});

module.exports = router