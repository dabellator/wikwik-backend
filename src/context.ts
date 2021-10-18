import { PrismaClient } from '@prisma/client';
import { verifyToken } from './utils/verifyToken';

export type Context = {
  prisma: PrismaClient
  isAuthenticated: boolean
}

const prisma = new PrismaClient()

export const context = async ({ req }) => {
  let isAuthenticated = false;
  console.log(req);
  
  try {
    const authHeader = req.headers.authorization || '';
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const payload = await verifyToken(token);
      console.log(payload);
      isAuthenticated = payload ? true : false;
    }
  } catch(e) {
    throw new Error(e);
  }

  return {
    isAuthenticated,
    prisma,
  };
}
