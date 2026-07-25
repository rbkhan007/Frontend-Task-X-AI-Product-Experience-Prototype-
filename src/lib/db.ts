// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

let db: InstanceType<typeof PrismaClient> | null = null;

export function getDb() {
  if (db) return db;
  db = globalForPrisma.prisma ?? new PrismaClient({ log: [] });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
  return db;
}