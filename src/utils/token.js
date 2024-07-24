// src/utils/token.js
const jwt = require('jsonwebtoken');

// ExpireIn 3 days
const generateAccessToken = (user) => {  
  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.SECRET_TOKEN, {
    expiresIn: '3d',
  });

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: '7d',
  });

  return refreshToken;
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
    return decoded;
  } catch (error) {
    //console.error(error);
    return null;
  }
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    return decoded;
  } catch (error) {
    //console.error(error);
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken };