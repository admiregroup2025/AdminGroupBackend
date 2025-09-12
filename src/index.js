import express from 'express';
import cors from 'cors';
import { ENV } from './config/ENV.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/errorHandler.js';
import leadsRoute from './routes/admireHolidays/leads.route.js';
import destinationRoute from './routes/admireHolidays/destination.route.js';
import blogRoute from './routes/admireHolidays/blog.route.js';
import testimonialRoute from './routes/admireHolidays/testimonial.route.js';
import userRouter from './routes/admireHolidays/user.route.js';
import adminRoute from './routes/adminRoutes/admin.route.js';
import customerGalleryRoute from './routes/admireHolidays/customerGallery.route.js';
import heroSectionRoute from './routes/admireHolidays/heroSection.route.js';
import textTestimonialRouter from './routes/admireHolidays/textTestimonial.route.js';

const app = express();

// Security middleware
app.use(cookieParser());
app.use(express.json({ limit: '10mb' })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});


const allowedOrigins = [
  'http://localhost:3000',
  'https://admireholidays.com',
  'https://www.admireholidays.com',
  'http://192.168.68.106:5173',
  'http://192.168.68.114:3000',
  'http://localhost:5173',
  'https://admin.admireholidays.com'
  
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests) only in development
    if (ENV.NODE_ENV === 'development' && !origin) {
      return callback(null, true);
    }
    
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400, // Cache preflight for 24 hours
};
app.use(cors(corsOptions));



connectDB();

app.get('/', (req, res) => {
  res.json({ status: 'API is working', version: '1.0' });
});



// Middleware to log requests
app.use('/api/v1/', leadsRoute);
app.use('/api/v1/destination', destinationRoute);
app.use('/api/v1', blogRoute);
app.use('/api/v1/', testimonialRoute);
app.use('/api/v1', textTestimonialRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/', customerGalleryRoute);
app.use('/api/v1', heroSectionRoute);
app.use('/admin', adminRoute);

// Temp 
app.get('/temp', (req, res) => {
  
  res.json({ message: 'Temporary endpoint for testing' });
});

// Global error handler
app.use(globalErrorHandler);

app.listen(ENV.PORT || 5000, () => {
  console.log(`Server is running ✅ on port ${ENV.PORT || 5000}`);
});
