import Ambulance from '../models/ambulance.js';
import bcrypt from 'bcryptjs';
import CaseUtils from '../utils/case.js';
export const registerAmbulance = async (req, res) => {
  const body = req.body;
  try {
    const ambulanceExists = await Ambulance.findOne({ email: req.body.email });
    if (ambulanceExists)
      return res
        .status(400)
        .json({ message: 'Ambulance with this email exists', success: false });
    const ambulance = new Ambulance({
      ...body,
    });
    await ambulance.save();
    const accessToken = await ambulance.generateAuthToken();
    res.status(201).json({
      message: 'Ambulance Registered',
      accessToken,
      success: true,
      ambulance: {
        id: ambulance.id,
        email: ambulance.email,
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
export const loginAmbulance = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Provide email and password', success: false });

  try {
    const ambulance = await Ambulance.findOne({ email });
    if (!ambulance)
      return res
        .status(404)
        .json({ message: 'Ambulance Not found.', success: false });

    const validPassword = await bcrypt.compare(password, ambulance.password);

    if (!validPassword)
      return res
        .status(400)
        .json({ message: 'Invalid Password', success: false });
    const accessToken = await ambulance.generateAuthToken();
    res.status(200).json({
      message: 'Login Successfull',
      accessToken,
      ambulance: { id: ambulance.id, email: ambulance.email },
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

export const ambulanceDetails = async (req, res) => {
  try {
    const ambulance = await Ambulance.findOne({ _id: req.ambulance._id });
    if (!ambulance)
      return res
        .status(404)
        .json({ message: 'Ambulance Not found', sucess: false });
    res.status(200).json({ ambulance });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const getAmbulanceCases = async (req, res) => {
  try {
    const cases = await CaseUtils.getCases(req.ambulance._id);
    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
