import PatientCase from '../models/patientCase.js';
import caseUtils from '../utils/case.js';
export const addCase = async (req, res) => {
  const body = req.body;
  try {
    const patientCase = new PatientCase({
      ...body,
      ambulance: req.ambulance._id,
    });
    await patientCase.save();
    res.status(201).json({
      message: 'Case added',
      success: true,
      case: {
        id: patientCase._id,
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
export const updateCase = async (req, res) => {
  const { caseId } = req.params;
  if (!caseId)
    return res
      .status(400)
      .json({ message: 'Provide case id.', success: false });
  try {
    const patientCase = await PatientCase.findOneAndUpdate(
      {
        _id: caseId,
      },
      {
        $set: {
          ...req.body,
        },
      }
    );
    if (!patientCase)
      return res
        .status(400)
        .json({ message: 'Case not found or unable to update' });
    res.status(201).json({
      message: 'Case updated',
      success: true,
      case: {
        id: patientCase.id,
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
export const getAllCases = async (req, res) => {
  try {
    const cases = await PatientCase.find({
      hospital: {
        $exists: false,
      },
    });
    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const acceptCase = async (req, res) => {
  const { caseId } = req.params;
  if (!caseId)
    return res.status(400).json({ message: 'Provide case id', success: false });
  try {
    const patientCase = await PatientCase.findOne({ _id: caseId });
    if (!patientCase)
      return res
        .status(404)
        .json({ message: 'Case not found', success: false });
    if (patientCase.hospital) {
      return res.status(403).json({
        message: 'Case already Assigned to other hospital',
        success: false,
      });
    }
    patientCase.hospital = req.hospital._id;
    await patientCase.save();
    res
      .status(200)
      .json({ message: `Case-${patientCase._id} Accepted`, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getHospitalCases = async (req, res) => {
  try {
    const cases = await PatientCase.find({ hospital: req.hospital._id });
    if (!cases)
      return res
        .status(404)
        .json({ message: 'Cases not found.', success: false });
    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const closeCase = async (req, res) => {
  const { caseId } = req.params;
  if (!caseId)
    return res.status(400).json({ message: 'Provide case id', success: false });
  try {
    const patientCase = await PatientCase.findOne({
      _id: caseId,
      ambulance: req.ambulance._id,
    });
    if (!patientCase)
      return res
        .status(404)
        .json({ message: 'Case not found', success: false });
    if (!patientCase.isActive) {
      return res
        .status(400)
        .json({ message: 'Case is already inactive', success: false });
    }
    patientCase.isActive = true;
    await patientCase.save();
    res.status(200).json({ message: 'Case Closed', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getCaseDetails = async (req, res) => {
  const { caseId } = req.params;
  if (!caseId)
    return res.status(400).json({ message: 'provide case id', success: false });
  try {
    const patientCase = await PatientCase.findOne({
      _id: caseId,
      hospital: req.hospital._id,
    });
    res.status(200).json({ case: patientCase });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
