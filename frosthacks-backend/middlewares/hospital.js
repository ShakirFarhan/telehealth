import jwt from 'jsonwebtoken';
import Hospital from '../models/hospital.js';

export const isHospitalAuthenticated = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return res
      .status(400)
      .json({ message: 'Provide authorizationHeader', success: false });
  try {
    let token = authorizationHeader.split(' ')[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const verifiedHospital = await Hospital.findOne({
      _id: verifyToken.id,
    }).select('-password');
    if (!verifiedHospital)
      return res.status(401).json({ message: 'Invalid Token!' });
    req.hospital = verifiedHospital;
    req.token = token;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
