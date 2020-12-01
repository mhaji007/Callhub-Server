// Responsible for creating a token
// after user is verified by Callhub
// we want to create a token for the user
// so they can make request with it
// used in App.
// When user has signed up with Callhub,
// we create jwt and

const jwt = require("jsonwebtoken")

// we need a secret to sign the certificate with
const secret = process.env.JWT_SECRET

// Create and sign the jwt
function createJwt(username) {
  const token = jwt.sign({username}, secret);
  return token;
}
// Verify jwt and retun the username
function verifyToken(token){
  const data=jwt.verify(token, secret);
  return data;
}

module.exports = {
  createJwt,
  verifyToken
}