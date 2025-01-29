const express = require('express')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });

const { groups } = require('./schema');
require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.dbURI;
const Groups =  mongoose.model('Groups', groups);
async function updateGroupProfilePicture(mobile, profilePhoto) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    //const MyFirstPripo = await mongoose.model('MyFirstPripo', schemaDef);

    //await MyFirstPripo.updateOne({ "mobile_number": mobile }, { $set: { "profile_photo":profilePhoto  }});
    
    await Groups.updateOne({ "admin": mobile }, { $set: { "profile_photo": profilePhoto } });

    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conngp(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.create(data);
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connjp(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.updateOne(data["query"], { $push: { "members": { "mobile_number": data["mobile_number"] } } });
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connajp(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.updateOne({ "_id": data["group_id"] }, { $push: { "members": { "mobile_number": data["mobile_number"] } } });
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connadcp(data) {
  try {
    console.log(data["mobile_number"]);
    console.log(data["reference_number"]);
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.updateOne({ "reference_number": data["reference_number"] }, { $set: { "admin": data["mobile_number"] } });
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connchgp(data) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.updateOne({ "reference_number": data["reference_number"] }, { $set: { "name": data["group_name"], "description": data["group_desc"] } });
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conndlcp(data) {
  try {
    //console.log(data["members"]);
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.updateOne(data["group"], { $pull: { "members": { "mobile_number": data["mobile_number"] } } })
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conndggcp(data) {
  try {
    //console.log(data["members"]);
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Groups.deleteOne(data);
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntgpr(n) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dat = await Groups.find({ "members.mobile_number": n }, { "members._id": 0 })
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntadr(n) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dat = await Groups.find({ "admin": n })
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntalllr() {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dat = await Groups.find();
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
router.post('/setgroupprofile', upload.single('profile_photo'), async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const mobile = req.body.mobile;
  if (req.file && mobile) {
    const profilePhoto = {
      filename: req.file.originalname,
      file: req.file.buffer,
      uploaded_at: new Date()
    };

    const ans = await updateGroupProfilePicture(mobile, profilePhoto);

    if (ans === 'yes') {
      res.status(201).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  } else {
    res.status(400).send({ error: 'Mobile number and file are required' });
  }
});
router.post('/creategroup', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const data = req.body;
  const ans = await conngp(data);

  if (ans === 'yes') {
    res.status(201).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.post('/joingroup', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const data = req.body;
  const ans = await connjp(data);

  if (ans === 'yes') {
    res.status(201).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.post('/addmgroup', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const data = req.body;
  const ans = await connajp(data);

  if (ans === 'yes') {
    res.status(201).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.put('/changeadmin', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await connadcp(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.put('/changegroup', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await connchgp(data);

  if (ans === 'yes') {
    res.status(200).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.post('/deletemember', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await conndlcp(data);

  if (ans === 'yes') {
    res.status(201).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.delete('/deletegroup', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await conndggcp(data);

  if (ans === 'yes') {
    res.status(201).send({ status: 'succeeded' });
  } else {
    res.status(400).send({ error: ans });
  }

  next();
});
router.post('/membergroups', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await conntgpr(data["mobile_number"]);
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

});
router.post('/allgroups', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await conntgpr(data["mobile_number"]);
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

})
router.post('/getadmin', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const data = req.body;
  const ans = await conntadr(data["mobile_number"]);
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

})
router.get('/allgroupss', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const ans = await conntalllr();
  if (Array.isArray(ans)) {
    res.status(200).send(ans)
    console.log(ans)
  } else {
    res.status(400).send({ error: ans });
  }
  next();

})
module.exports = router