import jwt from 'jsonwebtoken';
import Ambulance from '../models/ambulance.js';

export const isAmbulanceAuthenticated = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return res
      .status(400)
      .json({ message: 'Provide authorizationHeader', success: false });
  try {
    let token = authorizationHeader.split(' ')[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const verifiedAmbulance = await Ambulance.findOne({
      _id: verifyToken.id,
    }).select('-password');
    if (!verifiedAmbulance)
      return res.status(401).json({ message: 'Invalid Token!' });
    req.ambulance = verifiedAmbulance;
    req.token = token;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
