import mongoose from 'mongoose';
import { ENV } from './ENV.js';

const connectDB = async () => {
  const uri = ENV.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
  }
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log('MongoDB connected successfully ✅');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
