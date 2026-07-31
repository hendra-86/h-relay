import dotenv from 'dotenv';
import { envSchema } from './schema.js';

dotenv.config();

export const env = envSchema.parse(process.env);