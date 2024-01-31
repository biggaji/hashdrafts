import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

try {
  await db.$connect();
  console.log(`Database connected`);
} catch (e: any) {
  console.log(`Error connecting to database server: ${e.name} <> ${e.message}`);
}
