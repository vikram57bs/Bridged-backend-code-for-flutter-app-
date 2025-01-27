const jwt = require('jsonwebtoken');
require('dotenv').config();
// Secret key used for signing the token
const secretKey = process.env.secretKey;

// Middleware to verify token
function verifyToken(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Extract 'Bearer <token>'

  // If no token is provided, return an error
  if (!token) {
    return res.status(403).json({ message: 'No token is found' });
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // If the token is invalid, return an error
      return res.status(401).json({ message: 'expired token' });
    }

    // If the token is valid, attach the decoded information (e.g., user info) to the request
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = verifyToken;
