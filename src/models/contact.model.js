import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],   // matching the emails
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    archive:{
      type:Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const contactModel = mongoose.model('Contact', contactSchema);

export default contactModel;
