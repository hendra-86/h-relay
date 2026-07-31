import dotenv from 'dotenv';

import { envSchema } from './validation.js';

dotenv.config();

export const env = envSchema.parse(process.env);