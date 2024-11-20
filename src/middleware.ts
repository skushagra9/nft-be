import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './utils';

export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
  
    if (!token) {
      return res.status(403).json({ success: false, message: 'No token provided' });
    }
  
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  };