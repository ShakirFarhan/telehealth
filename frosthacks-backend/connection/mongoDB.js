import mongoose from 'mongoose';

export const createConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    console.log('MongoDB failed.');
  }
};
