import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const hospitalSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 8,
    },
    name: {
      type: String,
      required: true,
    },
    registrationId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    primaryContact: {
      type: Number,
      required: true,
    },
    regularTimeFrom: {
      type: String,
      required: true,
    },
    regularTimeTo: {
      type: String,
      required: true,
    },
    location: {
      addressUrl: String,
      latitude: Number,
      longitude: Number,
    },
    cases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientCase',
      },
    ],
    medicalSpecialities: [String],
    otherMedicalSpecialities: [String],
    paymentMethods: [String],
    govtHealthSchemes: [String],
    privateHealthSchemes: [String],
    emergencyServicesAvailability: Boolean,
    emergencyTimeFrom: String,
    emergencyTimeTo: String,
    ambulanceServicesAvailability: String,
    ambulanceServiceProviders: [String],
    typeOfAmbulancesServices: [String],
  },
  {
    timestamps: true,
  }
);
hospitalSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
hospitalSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { id: this._id, email: this.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    console.log('Error while Generating Auth Token');
  }
};
const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
