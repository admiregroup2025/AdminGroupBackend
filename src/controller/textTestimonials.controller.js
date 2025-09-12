import textTestimonialModel from '../models/textTestimonial.model.js';

export const createTextTestimonial = async (req, res) => {
  console.log("nand")
  try {
    const { name, location, rating, travelDate, destination, message } = req.body;
    console.log(req.body,"nawlesh")
    const profileImage = req.files?.profileImage ? req.files.profileImage[0].path : null;
    const trip_image = req.files?.trip_image ? req.files.trip_image.map((file) => file.path) : [];
    console.log(profileImage,trip_image)

    const newTestimonial = new textTestimonialModel({
      name,
      location,
      rating,
      travelDate,
      destination,
      profileImage,
      trip_image,
      message,
    });
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json({ success: true, data: savedTestimonial });
  } catch (error) {
    console.error('Error creating text testimonial:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
