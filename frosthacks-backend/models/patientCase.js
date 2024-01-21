import mongoose from 'mongoose';
const patientCase = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    caseType: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    bp: {
      type: String,
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    spo2: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    ambulance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ambulance',
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    eyeResponse: Number,
    verbalResponse: Number,
    motorResponse: Number,
  },
  {
    timestamps: true,
  }
);

const PatientCase = mongoose.model('PatientCase', patientCase);
export default PatientCase;
