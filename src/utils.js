import jwt from 'jsonwebtoken';
import { ENV } from './config/ENV.js';

export const generateToken = (userID, role = null) => {
  if (!userID) {
    throw new Error('User ID is required to generate token');
  }
  
  if (!ENV.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  const payload = { id: userID };
  if (role) {
    payload.role = role; // Include role only if provided
  }

  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '7d' });
};

export const formatCountryName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// export const generateToeknAdmin = (userID, role) => {
//   return jwt.sign({ id: userID, role: role }, process.env, JWT_SECRET, {
//     expiresIn: '7d',
//   });
// };
