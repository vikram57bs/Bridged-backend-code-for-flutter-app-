const express=require('express')
const router=express.Router()
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { schemaDef, conschema} = require('./schema');

const mongoose = require('mongoose');
const secretKey = process.env.secretKey;
const dbURI = process.env.dbURI;
const MyFirstPripo =  mongoose.model('MyFirstPripo', schemaDef);
const MyconPripo =  mongoose.model('MyconPripo', conschema);
async function connt(data) {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await MyconPripo.create(data);
    const user = { mobile: data["mobile_number"], role:"contractor"};
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    return {"result":"suc","token":token};
  } catch (err) {
    console.error(err);
    return err.message;
  }
}

async function updateContractorProfilePicture(mobile, profilePhoto) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


    const firstPripoRecord = await MyFirstPripo.findOne({ "mobile_number": mobile });

    if (firstPripoRecord) {
      await MyFirstPripo.updateOne({ "mobile_number": mobile }, { $set: { "profile_photo": profilePhoto } });
      return 'yes';
    } else {
      const conPripoRecord = await MyconPripo.findOne({ "mobile_number": mobile });

      if (conPripoRecord) {
        await MyconPripo.updateOne({ "mobile_number": mobile }, { $set: { "profile_photo": profilePhoto } });
        return 'yes';
      } else {
        return 'Mobile number not found in any collection';
      }
    }
  } catch (err) {
    console.error(err);
    return err.message;
  } 
}

  async function conncpcp(data) {
    try {
      await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
      if (data["type"] == "create") {
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $push: { "favourites": { "reference_number": data["reference_number"] } } });
      } else {
        await MyconPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $pull: { "favourites": { "reference_number": data["reference_number"] } } });
      }
      return 'yes';
    } catch (err) {
      console.error(err);
      const a = err.message
      return (a);
    }
  }
async function conncappl(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne(
      { 'posts._id': data["post_id"] },
      { $push: { 'posts.$[elem].workers.applied.individual': { "mobile_number": data["mobile_number"] } } },
      { arrayFilters: [{ 'elem._id': data["post_id"] }] }
    )
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conncapplg(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne(
      { 'posts._id': data["post_id"] },
      { $push: { 'posts.$[elem].workers.applied.group': { "reference_number": data["reference_number"] } } },
      { arrayFilters: [{ 'elem._id': data["post_id"] }] }
    )
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntp(id, post) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne({ "mobile_number": id }, { $push: { "posts": post } })
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connarrp(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

    await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $push: { "reports": { "postid": data["post_id"] } } });

    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connacccp(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    const pp = await MyconPripo.find(
      { "posts._id": data["post_id"]},
      { "posts.$": 1 }
    );

    //const ff=JSON.parse(pp);
    const pst = pp;
    pst[0]["posts"][0]["workers"]["current"]["individual"].forEach(async(mm)=>{
      await MyconPripo.updateOne(
        { 'posts._id': data["post_id"] },
        { $push: { "posts.$[elem].workers.completed.individual": mm } },
        { arrayFilters: [{ 'elem._id': data["post_id"] }] }
      )

    })
    pst[0]["posts"][0]["workers"]["current"]["group"].forEach(async(mm)=>{
      await MyconPripo.updateOne(
        { 'posts._id': data["post_id"] },
        { $push: { "posts.$[elem].workers.completed.group": mm } },
        { arrayFilters: [{ 'elem._id': data["post_id"] }] }
      )

    })
    //const curr=pst[0]["workers"]["current"];

    //await MyFirstPripo.updateOne({ "mobile_number": data["mobile_number"] }, { $push: { "reports": { "postid": data["post_id"] } } });
    await MyconPripo.updateOne(
      { 'posts._id': data["post_id"] },
      { $set: { 'posts.$[elem].workers.current': { "individual": [], "group": [] } } },
      { arrayFilters: [{ 'elem._id': data["post_id"] }] }
    )
   

    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connhggp(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne(
      { 'posts._id': data["postid"] },
      { $push: { 'posts.$[elem].workers.current.group': { "reference_number": data["reference_number"] } } },
      { arrayFilters: [{ 'elem._id': data["postid"] }] }
    )
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connhiip(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne(
      { 'posts._id': data["postid"] },
      { $push: { 'posts.$[elem].workers.current.individual': { "mobile_number": data["mobile_number"] } } },
      { arrayFilters: [{ 'elem._id': data["postid"] }] }
    )
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connfiip(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne(
      { 'posts._id': data["postid"] },
      { $pull: { 'posts.$[elem].workers.applied.individual': { "mobile_number": data["mobile_number"] } } },
      { arrayFilters: [{ 'elem._id': data["postid"] }] }
    )
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connfggp(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne(
      { 'posts._id': data["postid"] },
      { $pull: { 'posts.$[elem].workers.applied.group': { "reference_number": data["reference_number"] } } },
      { arrayFilters: [{ 'elem._id': data["postid"] }] }
    )
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function connchpp(data) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    await MyconPripo.updateOne({ "posts._id": data["postId"] }, { $set: { "posts.$": data["newPost"] } });
    return 'yes';
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntpr(n) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    const dat = await MyconPripo.find({ "mobile_number": n }, { "posts": 1 ,"profile_photo":1})
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntmmm(n) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    //const MyFirstPripo = await mongoose.model('MyFirstPripo', schemaDef);
    //const dat = await MyFirstPripo.find({ "mobile_number": n })
    const dat = await MyconPripo.find({ "mobile_number": n })
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntbbb(n) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    //const MyFirstPripo = await mongoose.model('MyFirstPripo', schemaDef);
    //const dat = await MyFirstPripo.find({ "mobile_number": n })
    const dat = await MyFirstPripo.find({ "mobile_number": n })
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntffr(n) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    const dat = await MyconPripo.find({ "mobile_number": n }, { "favourites": 1 })
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntfctd() {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    const dat = await MyconPripo.find();
    console.log(dat,"dat");
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntappr() {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    const dat = await MyconPripo.find({}, { "_id": 0 });
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
async function conntffprc(n) {
  try {
    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    const dat = await MyconPripo.find({ "mobile_number": n },{"favourites":1,"_id":0});
    return dat;
  } catch (err) {
    console.error(err);
    const a = err.message
    return (a);
  }
}
router.post('/postcontractordata', upload.fields([
    { name: 'identity_proof', maxCount: 1 },
    { name: 'institution_proof', maxCount: 1 }
  ]), async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  
    const data = req.body;
  
    if (req.files['identity_proof']) {
      const identityFile = req.files['identity_proof'][0];
      data.identity_proof = {
        filename: identityFile.originalname,
        file: identityFile.buffer,
        uploaded_at: new Date()
      };
    }
  
    if (req.files['institution_proof']) {
      const institutionFile = req.files['institution_proof'][0];
      data.institution_proof = {
        filename: institutionFile.originalname,
        file: institutionFile.buffer,
        uploaded_at: new Date()
      };
    }
  
    const ans = await connt(data);
  
    if (ans["result"] === 'suc') {
      const token=ans["token"];
      res.status(201).send({ token });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.post('/edituserprofile', upload.single('profile_photo'), async (req, res) => {
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
  
      const ans = await updateContractorProfilePicture(mobile, profilePhoto);
  
      if (ans === 'yes') {
        res.status(201).send({ status: 'succeeded' });
      } else {
        res.status(400).send({ error: ans });
      }
    } else {
      res.status(400).send({ error: 'Mobile number and file are required' });
    }
  });
  router.post('/contractorfavourite', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  
    const data = req.body;
    const ans = await conncpcp(data);
  
    if (ans === 'yes') {
      res.status(201).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.post('/createapplicationindi', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  
    const data = req.body;
    const ans = await conncappl(data);
  
    if (ans === 'yes') {
      res.status(201).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.post('/createapplicationgroup', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  
    const data = req.body;
    const ans = await conncapplg(data);
  
    if (ans === 'yes') {
      res.status(201).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.post('/contractorpost', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const { contractorId, newPost } = req.body;
    const ans = await conntp(contractorId, newPost);
  
    if (ans === 'yes') {
      res.status(201).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/createareport', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  
    const data = req.body;
    const ans = await connarrp(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/completejob', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  
    const data = req.body;
    const ans = await connacccp(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/hiregroup', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data = req.body;
    const ans = await connhggp(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/hireind', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data = req.body;
    const ans = await connhiip(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/firegroup', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data = req.body;
    const ans = await connfggp(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/fireind', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data = req.body;
    const ans = await connfiip(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.put('/contractorpostedit', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data = req.body;
    const ans = await connchpp(data);
  
    if (ans === 'yes') {
      res.status(200).send({ status: 'succeeded' });
    } else {
      res.status(400).send({ error: ans });
    }
  
    next();
  });
  router.post('/contractorprojects', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data=req.body;
    const ans = await conntpr(data["mobile_number"]);
    if (Array.isArray(ans)) {
      res.status(200).send(ans)
      console.log(ans)
    } else {
      res.status(400).send({ error: ans });
    }
    next();
  
  });
  router.get('/myowndata', require('./sessions'),async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    var ans;
    if(req.user.role=="worker"){
      ans = await conntbbb(req.user.mobile);
    }else{
      ans = await conntmmm(req.user.mobile);
    }
    if (Array.isArray(ans)) {
      res.status(200).send(ans)
      console.log(ans)
    } else {
      res.status(400).send({ error: ans });
    }
    next();
  
  });
  router.post('/contractorfavs', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data=req.body;
    const ans = await conntffr(data["mobile_number"]);
    if (Array.isArray(ans)) {
      res.status(200).send(ans)
      console.log(ans)
    } else {
      res.status(400).send({ error: ans });
    }
    next();
  
  });
  router.get('/fetchcompleted', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const ans = await conntfctd();
    if (Array.isArray(ans)) {
      res.status(200).send(ans)
      console.log(ans)
    } else {
      res.status(400).send({ error: ans });
    }
    next();
  
  });
  router.get('/allprojects', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const ans = await conntappr();
    if (Array.isArray(ans)) {
      res.status(200).send(ans)
      console.log(ans)
    } else {
      res.status(400).send({ error: ans });
    }
    next();
  
  });
  router.post('/favgroupscon', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data=req.body;
    const ans = await conntffprc(data["mobile_number"]);
    if (Array.isArray(ans)) {
      res.status(200).send(ans)
      console.log(ans)
    } else {
      res.status(400).send({ error: ans });
    }
    next();
  
  });
  

module.exports=router