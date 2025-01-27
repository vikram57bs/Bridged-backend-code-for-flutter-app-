const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const logs = require('./logs');
const bodyParser = require('body-parser');
const port = process.env.PORT;
app.use(bodyParser.json());


// Function to connect to MongoDB and insert data
app.use(cors());

// Middleware for parsing URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (ensure the directory contains the file)
app.use('/', express.static(path.join(__dirname)));
app.use('/workers', express.static(path.join(__dirname,'logfiles.txt')));
app.use('/contractors', express.static(path.join(__dirname,'logfiles.txt')));
app.use('/groups', express.static(path.join(__dirname,'logfiles.txt')));
app.use('/credentials', express.static(path.join(__dirname,'logfiles.txt')));
app.use('/sessions/checktoken', express.static(path.join(__dirname,'logfiles.txt')));
// Middleware for logging requests
app.use((req, res, next) => {
  logs(`${req.method}\t${req.url}\t${req.headers.origin}`, 'logfiles.txt');
  next();
});
app.get('/home', (req, res) => {
  res.send('Hello, your server is running successfully!');
});
app.use('/workers',require('./wokrers'));
app.use('/contractors',require('./contractors'));
app.use('/groups',require('./groups'));
app.use('/credentials',require('./login'));
app.post('/sessions/checktoken', require('./sessions'), (req, res) => {
  res.status(200).json({ message: 'The token is valid', user: req.user });
});

app.use((err, req, res, next) => {
  logs(`${err.message}\t${req.headers.origin}`, 'errlogfiles.txt');
  res.status(500).send({ error: err.message });
  next();
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Server is running on port', port);
  }
});
// Route for handling POST requests to '/a'








































// Error handling middleware

