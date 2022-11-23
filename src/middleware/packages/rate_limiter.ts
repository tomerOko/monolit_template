import rateLimit from 'express-rate-limit'
import { config } from '../../config/confing_mock';

export default rateLimit(config.system.api_server.rate_limiter);

