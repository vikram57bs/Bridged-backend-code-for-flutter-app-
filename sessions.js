const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.secretKey;

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token is found' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'expired token' });
    }

    req.user = decoded;
    next(); 
  });
}

module.exports = verifyToken;
