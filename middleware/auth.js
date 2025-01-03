import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).send('Forbidden');
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Forbidden');
    req.decoded = decoded;
    next();
  });
};
