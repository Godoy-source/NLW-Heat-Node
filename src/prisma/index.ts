import { PrismaClient } from ".prisma/client";

// Conectando DB
const prismaClient = new PrismaClient();

export default prismaClient;