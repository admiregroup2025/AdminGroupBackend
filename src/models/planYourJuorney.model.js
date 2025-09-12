import mongoose from 'mongoose';

const planYourJourneySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  archive:{
    type:Boolean,
    default: false,
  }
},{timestamps:true});

const PlanYourJourney = mongoose.model('PlanYourJourney', planYourJourneySchema);

export default PlanYourJourney;
