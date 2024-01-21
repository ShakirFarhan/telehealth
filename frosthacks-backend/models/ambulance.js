import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const ambulanceSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    vehicleNo: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      name: {
        type: String,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
    },
    cases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientCase',
      },
    ],
  },
  {
    timestamps: true,
  }
);
ambulanceSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
ambulanceSchema.methods.generateAuthToken = function () {
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
const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
export default Ambulance;
