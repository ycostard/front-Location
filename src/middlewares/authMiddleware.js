const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Vous n'êtes pas autorisé." });
  }

  try {
    const token = authHeader.split(' ')[1]; // Extraction du token sans le préfixe "Bearer"
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    //console.error(error);
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;