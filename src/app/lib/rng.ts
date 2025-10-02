"use server";
import prisma from "@/app/lib/prisma";
import { Feature, Prisma } from "@prisma/client";

export async function getRandomFeatures(amount: number): Promise<Feature[] | null> {
  const result: Feature[] = await prisma.$queryRaw(
    Prisma.sql`
            SELECT * FROM "Feature" 
            ORDER BY RANDOM() 
            LIMIT ${amount}
        `
  );
  return result || null;
}

