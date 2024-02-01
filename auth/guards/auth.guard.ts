import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
const { JsonWebTokenError } = jwt;

// Load env
config();

async function verifyJwtToken() {
  try {
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error('Session expired, sign in again');
    }
    throw error;
  }
}
