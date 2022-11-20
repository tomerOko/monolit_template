import rateLimit from 'express-rate-limit'

export default rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds
  max: 100,
  message: 'You have exceeded the 1000 requests in 10 minutes limit!', 
  headers: false,
});

