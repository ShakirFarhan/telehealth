import Hospital from '../models/hospital.js';
import bcrypt from 'bcryptjs';
export const registerHospital = async (req, res) => {
  let body = req.body;
  try {
    const hospitalExists = await Hospital.findOne({ email: req.body.email });
    if (hospitalExists)
      return res
        .status(400)
        .json({ message: 'Hospital with this email exists', success: false });
    const hospital = new Hospital({
      ...body,
    });
    await hospital.save();
    const token = await hospital.generateAuthToken();
    res.status(201).json({
      message: 'Hospital Registered',
      success: true,
      token,
      hospital: {
        id: hospital.id,
        email: hospital.email,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }

      return res.status(400).json({
        errors: validationErrors,
        message: 'Validation failed. Please check your input.',
        success: false,
      });
    }
    res.status(500).json({ message: error.message, success: false });
  }
};

export const loginHospital = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Provide email and password', success: false });

  try {
    const hospital = await Hospital.findOne({ email });
    if (!hospital)
      return res
        .status(404)
        .json({ message: 'Hospital Not found.', success: false });

    const validPassword = await bcrypt.compare(password, hospital.password);

    if (!validPassword)
      return res
        .status(400)
        .json({ message: 'Invalid Password', success: false });
    const accessToken = await hospital.generateAuthToken();
    res.status(200).json({
      message: 'Login Successfull',
      accessToken,
      hospital: { id: hospital.id, email: hospital.email },
      success: true,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }
      return res.status(400).json({
        errors: validationErrors,
        message: 'Validation failed. Please check your input.',
        success: false,
      });
    }
    res.status(500).json({ message: error.message, success: false });
  }
};

export const hospitalDetails = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({
      _id: req.hospital._id,
    }).select('-password');
    if (!hospital)
      return res
        .status(404)
        .json({ message: 'Hospital Not found', success: false });
    res.status(200).json({ hospital });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
