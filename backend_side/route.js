import express from 'express';
import { getData } from './service.js';
const router = express.Router();

const GET_ALL_DATA = '/get-data';

// Middleware function for logging requests
router.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

router.get(GET_ALL_DATA, getData);

export default router;
