import express from 'express';
import multer from 'multer';
import { getData, postData } from './service.js';
const router = express.Router();

const GET_ALL_DATA = '/get-data';
const POST_DATA = '/post-data';

// Middleware function for logging requests
router.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);

  next();
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get(GET_ALL_DATA, getData);
router.get(POST_DATA, upload.none(), postData);

export default router;
