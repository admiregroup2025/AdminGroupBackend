import jwt from 'jsonwebtoken';
import { ENV } from '../config/ENV.js';

export const auth = async (req, res, next) => {
  try {
    // Check token from either cookie or Authorization header
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Unauthorized: No token', success: false });
    }

    if (!ENV.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ msg: 'Server configuration error', success: false });
    }

    const authorized = jwt.verify(token, ENV.JWT_SECRET);

    if (!authorized.id) {
      return res.status(401).json({ msg: 'Invalid token structure', success: false });
    }

    req.userId = authorized.id;
    req.userRole = authorized.role || null;

    next();
  } catch (error) {
    console.error(`Auth middleware -> ${error.message}`);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Invalid or expired token', success: false });
    }
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};
export const authorizeAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.', success: false });
  }
  next();
};
